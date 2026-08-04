import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import authStore from '../stores/authStore';
import AppConstants from '../utils/AppConstants';
import AuthLayout from '../components/Auth/AuthLayout';
import FormInputField from '../components/common/FormInputField';
import FormPasswordField from '../components/common/FormPasswordField';

const SignupPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    authStore.clearError();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await authStore.signup();
    if (success) {
      navigate('/', { replace: true });
    }
  }

  return (
    <AuthLayout
      title={AppConstants.SIGNUP_TITLE}
      subtitle={AppConstants.SIGNUP_SUBTITLE}
      footer={
        <p className="text-sm text-gray-500">
          {`${AppConstants.HAVE_ACCOUNT_TEXT} `}
          <Link to="/login" className="text-[#1e3a5f] font-semibold hover:underline">
            {AppConstants.SIGN_IN_LABEL}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormInputField field={authStore.signupNameField} />
        <FormInputField field={authStore.signupEmailField} />
        <FormPasswordField field={authStore.signupPasswordField} />
        <FormPasswordField field={authStore.signupConfirmPasswordField} />

        {authStore.errorMessage && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 flex items-center gap-1.5">
            <i className="pi pi-exclamation-circle" />
            {authStore.errorMessage}
          </p>
        )}

        <Button
          type="submit"
          label={authStore.isSubmitting ? AppConstants.CREATING_ACCOUNT_LABEL : AppConstants.CREATE_ACCOUNT_LABEL}
          loading={authStore.isSubmitting}
          className="w-full h-10 text-sm bg-[#1e3a5f] border-0 text-white justify-center"
        />
      </form>
    </AuthLayout>
  )
})

export default SignupPage;
