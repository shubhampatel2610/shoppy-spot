import axios from 'axios';
import AppConstants from '../utils/AppConstants';

const BASE_URL = 'https://dummyjson.com';
const REQUEST_TIMEOUT = 15000;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

// Maps any failure - network, timeout, cancel, 4xx/5xx - to a friendly message.
const resolveErrorMessage = (error) => {
  if (axios.isCancel(error)) {
    return AppConstants.CANCELLED_ERROR_MESSAGE;
  }

  if (error.code === 'ECONNABORTED') {
    return AppConstants.TIMEOUT_ERROR_MESSAGE;
  }

  if (!error.response) {
    return AppConstants.NETWORK_ERROR_MESSAGE;
  }

  const { status, data } = error.response;
  const serverMessage = data?.message;

  switch (status) {
    case 400: return serverMessage || AppConstants.BAD_REQUEST_MESSAGE;
    case 401: return serverMessage || AppConstants.UNAUTHORIZED_MESSAGE;
    case 403: return serverMessage || AppConstants.FORBIDDEN_MESSAGE;
    case 404: return serverMessage || AppConstants.NOT_FOUND_MESSAGE;
    case 408: return AppConstants.TIMEOUT_ERROR_MESSAGE;
    case 409: return serverMessage || AppConstants.CONFLICT_MESSAGE;
    case 422: return serverMessage || AppConstants.VALIDATION_ERROR_MESSAGE;
    case 429: return AppConstants.TOO_MANY_REQUESTS_MESSAGE;
    case 500: return AppConstants.SERVER_ERROR_MESSAGE;
    case 502:
    case 503:
    case 504: return AppConstants.SERVICE_UNAVAILABLE_MESSAGE;
    default: return serverMessage || AppConstants.GENERIC_ERROR_MESSAGE;
  }
}

// Unwrap payload on success so service files get data directly.
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = resolveErrorMessage(error);
    const isCancelled = axios.isCancel(error);

    const apiError = new Error(message);
    apiError.status = error.response?.status ?? null;
    apiError.isNetworkError = !error.response && !isCancelled;
    apiError.isCancelled = isCancelled;
    apiError.original = error;

    return Promise.reject(apiError);
  }
);

export default axiosClient;
