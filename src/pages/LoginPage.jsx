import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import authStore from '../stores/authStore';
import AppConstants from '../utils/AppConstants';
import AuthLayout from '../components/Auth/AuthLayout';
import DemoCredentialsInfo from '../components/Auth/DemoCredentialsInfo';
import FormInputField from '../components/common/FormInputField';
import FormPasswordField from '../components/common/FormPasswordField';

const LoginPage = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    authStore.clearError();
  }, []);

  const handleDemoSelect = (account) => {
    authStore.loginEmailField.setValue(account.email);
    authStore.loginPasswordField.setValue(account.password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await authStore.login();
    if (success) {
      // Always land on the product listing after login, regardless of where the
      // login flow was triggered from (navbar, checkout gate, etc).
      navigate('/', { replace: true });
    }
  }

  return (
    <AuthLayout
      title={AppConstants.LOGIN_TITLE}
      subtitle={AppConstants.LOGIN_SUBTITLE}
      titleExtra={<DemoCredentialsInfo onSelect={handleDemoSelect} />}
      footer={
        <p className="text-sm text-gray-500">
          {`${AppConstants.NO_ACCOUNT_TEXT} `}
          <Link to="/signup" className="text-[#1e3a5f] font-semibold hover:underline">
            {AppConstants.SIGN_UP_LABEL}
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormInputField field={authStore.loginEmailField} />
        <FormPasswordField field={authStore.loginPasswordField} />

        {authStore.errorMessage && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 flex items-center gap-1.5">
            <i className="pi pi-exclamation-circle" />
            {authStore.errorMessage}
          </p>
        )}

        <Button
          type="submit"
          label={authStore.isSubmitting ? AppConstants.SIGNING_IN_LABEL : AppConstants.SIGN_IN_LABEL}
          loading={authStore.isSubmitting}
          className="w-full h-10 text-sm bg-[#1e3a5f] border-0 text-white justify-center"
        />
      </form>
    </AuthLayout>
  )
})

export default LoginPage;
