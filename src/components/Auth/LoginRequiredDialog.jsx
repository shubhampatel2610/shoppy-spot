import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import authStore from '../../stores/authStore';
import AppConstants from '../../utils/AppConstants';

// Global "please log in" prompt, driven entirely by authStore - mounted once at the
// app root. Any handler, anywhere, can trigger it with `authStore.requireLogin()`
// instead of a silent redirect; no per-page dialog state or wiring needed.
const LoginRequiredDialog = observer(() => {
  const navigate = useNavigate();

  const handleLogin = () => {
    authStore.hideLoginPrompt();
    navigate('/login');
  }

  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={AppConstants.LOGIN_REQUIRED_BUTTON_LABEL}
        onClick={handleLogin}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header={AppConstants.LOGIN_REQUIRED_TITLE}
      visible={authStore.isLoginPromptVisible}
      onHide={authStore.hideLoginPrompt}
      footer={footer}
      className="w-full max-w-sm mx-4"
      blockScroll
    >
      <div className="flex items-start gap-3 pt-1">
        <i className="pi pi-lock text-2xl text-[#1e3a5f]" />
        <p className="text-sm text-gray-600">{authStore.loginPromptMessage}</p>
      </div>
    </Dialog>
  )
})

export default LoginRequiredDialog;
