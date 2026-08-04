import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import authStore from '../stores/authStore';
import AppConstants from '../utils/AppConstants';

const UnauthorizedPage = observer(() => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    authStore.logout();
    navigate('/login', { replace: true });
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <i className="pi pi-lock text-5xl text-gray-300" />
        <h1 className="text-lg font-bold text-gray-800 mt-4">{AppConstants.UNAUTHORIZED_PAGE_TITLE}</h1>
        <p className="text-sm text-gray-400 mt-1">{AppConstants.UNAUTHORIZED_PAGE_MESSAGE}</p>
        <Button
          label={AppConstants.UNAUTHORIZED_PAGE_BUTTON_LABEL}
          icon="pi pi-sign-in"
          onClick={handleGoBack}
          className="mt-5 h-9 text-sm bg-[#1e3a5f] border-0 text-white"
        />
      </div>
    </main>
  )
})

export default UnauthorizedPage;
