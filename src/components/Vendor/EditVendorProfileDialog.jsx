import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import vendorProfileStore from '../../stores/vendorProfileStore';
import AppConstants from '../../utils/AppConstants';
import FormInputField from '../common/FormInputField';

// Dialog to edit store profile fields, prefilled from the current saved profile -
// same shape as the customer UserDetails EditProfileDialog.
const EditVendorProfileDialog = observer(() => {
  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={AppConstants.CANCEL_LABEL}
        outlined
        onClick={vendorProfileStore.closeEditDialog}
        className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
      />
      <Button
        label={AppConstants.SAVE_LABEL}
        onClick={vendorProfileStore.saveProfile}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header="Edit Store Profile"
      visible={vendorProfileStore.isEditDialogOpen}
      onHide={vendorProfileStore.closeEditDialog}
      footer={footer}
      className="w-full max-w-2xl mx-4"
      blockScroll
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <FormInputField field={vendorProfileStore.storeNameField} />
        <FormInputField field={vendorProfileStore.phoneField} keyfilter="num" />
        <FormInputField field={vendorProfileStore.storeDescriptionField} />
        <FormInputField field={vendorProfileStore.logoUrlField} />
        <FormInputField field={vendorProfileStore.businessAddressField} />
      </div>
    </Dialog>
  )
})

export default EditVendorProfileDialog;
