import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import vendorPersonalStore from '../../stores/vendorPersonalStore';
import AppConstants from '../../utils/AppConstants';
import FormInputField from '../common/FormInputField';

// Dialog to edit the vendor's own personal details, prefilled from the current
// saved profile - same shape as EditVendorProfileDialog, just a different store.
const EditVendorPersonalDialog = observer(() => {
  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={AppConstants.CANCEL_LABEL}
        outlined
        onClick={vendorPersonalStore.closeEditDialog}
        className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
      />
      <Button
        label={AppConstants.SAVE_LABEL}
        onClick={vendorPersonalStore.saveProfile}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header="Edit Personal Details"
      visible={vendorPersonalStore.isEditDialogOpen}
      onHide={vendorPersonalStore.closeEditDialog}
      footer={footer}
      className="w-full max-w-lg mx-4"
      blockScroll
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <FormInputField field={vendorPersonalStore.nameField} />
        <FormInputField field={vendorPersonalStore.phoneField} keyfilter="num" />
        <FormInputField field={vendorPersonalStore.emailField} />
      </div>
    </Dialog>
  )
})

export default EditVendorPersonalDialog;
