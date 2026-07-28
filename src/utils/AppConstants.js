class AppConstants {
    // Navbar Constants
    static LOGO_TEXT = "ShoppySpot";
    static SEARCH_BAR_PLACEHOLDER = "Search products...";

    // Common Component Constants
    static LOADING_MESSAGE = "Loading...";
    static RETRY_LABEL = "Retry";

    // ProductListing Page Constants
    static ALL_PRODUCTS_HEADER = "All Products";
    static FILTERED_PRODUCTS_HEADER = "Filtered Products";
    static SINGULAR_PRODUCT_LABEL = "product";
    static PLURAL_PRODUCT_LABEL = "products";
    static FOUND_POSTFIX = 'found';
    static FILTERS_LABEL = "Filters";

    // ProductDetail Page Constants
    static PRODUCT_DETAIL_LOADING_TEXT = "Loading product details...";
    static BACK_LABEL = "Back";
    static BRAND_HEADER = "Brand";
    static CATEGORY_HEADER = "Category";
    static IN_STOCK_POSTFIX = "in stock";
    static OUT_OF_STOCK_POSTFIX = "Out of stock";
    static DESCRIPTION_HEADER = "Description";
    static REVIEWS_HEADER = "Reviews";
    static ADD_TO_CART_LABEL = "Add to Cart";
    static ADD_TO_WISHLIST_LABEL = "Add to Wishlist";
    static MORE_IMAGES_LABEL = "More Images";

    // FilterPanel Constants
    static CLEAR_LABEL = "Clear Filters";
    static CATEGORIES_HEADER = "Categories";
    static CATEGORIES_LOADING_TEXT = "Loading categories...";
    static PRICE_RANGE_HEADER = "Price Range";
    static MIN_PLACEHOLDER = "Min";
    static MAX_PLACEHOLDER = "Max";
    static APPLY_BUTTON_LABEL = "Apply";
    static CLEAR_PRICE_LABEL = "Clear Price Filter";
    static BRANDS_HEADER = "Brands";
    static NO_BRANDS_TEXT = "No brands available";

    // ProductGrid Constants
    static PRODUCT_LOADING_TEXT = "Fetching products...";

    // Pagination Constants
    static PREVIOUS_LABEL = "Previous";
    static NEXT_LABEL = "Next";

    // Error Boundary Constants
    static ERROR_BOUNDARY_TITLE = "Something went wrong";
    static ERROR_BOUNDARY_MESSAGE = "An unexpected error occurred while rendering this page. Please reload and try again.";
    static RELOAD_LABEL = "Reload Page";

    // API / HTTP Error Constants
    static NETWORK_ERROR_MESSAGE = "Unable to connect to the server. Please check your internet connection.";
    static TIMEOUT_ERROR_MESSAGE = "Request timed out. Please try again.";
    static CANCELLED_ERROR_MESSAGE = "Request was cancelled.";
    static BAD_REQUEST_MESSAGE = "Invalid request. Please check your input.";
    static UNAUTHORIZED_MESSAGE = "You are not authorized. Please log in again.";
    static FORBIDDEN_MESSAGE = "You do not have permission to perform this action.";
    static NOT_FOUND_MESSAGE = "The requested resource was not found.";
    static CONFLICT_MESSAGE = "This action conflicts with existing data.";
    static VALIDATION_ERROR_MESSAGE = "Some fields are invalid. Please review and try again.";
    static TOO_MANY_REQUESTS_MESSAGE = "Too many requests. Please slow down and try again.";
    static SERVER_ERROR_MESSAGE = "Something went wrong on our end. Please try again later.";
    static SERVICE_UNAVAILABLE_MESSAGE = "Server is currently unavailable. Please try again later.";
    static GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again.";
}

export default AppConstants;