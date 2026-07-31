import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import userStore from '../../stores/userStore';
import AppConstants from '../../utils/AppConstants';
import FormInputField from '../common/FormInputField';
import FormDropdownField from '../common/FormDropdownField';

// Dialog to edit personal info fields, prefilled from the current saved profile
const EditProfileDialog = observer(() => {
  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={AppConstants.CANCEL_LABEL}
        outlined
        onClick={userStore.closeProfileDialog}
        className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
      />
      <Button
        label={AppConstants.SAVE_LABEL}
        onClick={userStore.saveProfile}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header={AppConstants.EDIT_PROFILE_TITLE}
      visible={userStore.isProfileDialogOpen}
      onHide={userStore.closeProfileDialog}
      footer={footer}
      className="w-full max-w-2xl mx-4"
      blockScroll
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <FormInputField field={userStore.firstNameField} />
        <FormInputField field={userStore.middleNameField} />
        <FormInputField field={userStore.lastNameField} />
        <FormInputField field={userStore.emailField} />
        <FormInputField field={userStore.phoneField} keyfilter="num" />
        <FormDropdownField field={userStore.genderField} options={AppConstants.GENDER_OPTIONS} />
      </div>
    </Dialog>
  )
})

export default EditProfileDialog;
