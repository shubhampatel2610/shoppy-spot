import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import adminPersonalStore from '../../stores/adminPersonalStore';
import AppConstants from '../../utils/AppConstants';
import FormInputField from '../common/FormInputField';

// Dialog to edit the admin's own personal details - same shape as
// EditVendorPersonalDialog, just a different store and no store-profile counterpart.
const EditAdminProfileDialog = observer(() => {
  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={AppConstants.CANCEL_LABEL}
        outlined
        onClick={adminPersonalStore.closeEditDialog}
        className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
      />
      <Button
        label={AppConstants.SAVE_LABEL}
        onClick={adminPersonalStore.saveProfile}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header="Edit Personal Details"
      visible={adminPersonalStore.isEditDialogOpen}
      onHide={adminPersonalStore.closeEditDialog}
      footer={footer}
      className="w-full max-w-lg mx-4"
      blockScroll
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <FormInputField field={adminPersonalStore.nameField} />
        <FormInputField field={adminPersonalStore.phoneField} keyfilter="num" />
        <FormInputField field={adminPersonalStore.emailField} />
      </div>
    </Dialog>
  )
})

export default EditAdminProfileDialog;
