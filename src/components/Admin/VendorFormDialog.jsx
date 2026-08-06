import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import adminVendorStore from '../../stores/adminVendorStore';
import AppConstants from '../../utils/AppConstants';
import FormInputField from '../common/FormInputField';

// Provisions or edits a vendor account - same one-dialog-does-both-modes shape as
// EditVendorProfileDialog, just driven by adminVendorStore.editingVendorId instead
// of a separate "add" page, since vendor accounts have far fewer fields than a product.
const VendorFormDialog = observer(() => {
  const isEditMode = Boolean(adminVendorStore.editingVendorId);

  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={AppConstants.CANCEL_LABEL}
        outlined
        onClick={adminVendorStore.closeForm}
        className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
      />
      <Button
        label={isEditMode ? 'Save Changes' : 'Add Vendor'}
        onClick={adminVendorStore.saveVendor}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header={isEditMode ? 'Edit Vendor' : 'Add Vendor'}
      visible={adminVendorStore.isFormOpen}
      onHide={adminVendorStore.closeForm}
      footer={footer}
      className="w-full max-w-2xl mx-4"
      blockScroll
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <FormInputField field={adminVendorStore.ownerNameField} />
        <FormInputField field={adminVendorStore.emailField} />
        <FormInputField field={adminVendorStore.storeNameField} />
        <FormInputField field={adminVendorStore.phoneField} keyfilter="num" />
        <FormInputField field={adminVendorStore.storeDescriptionField} />
        <FormInputField field={adminVendorStore.logoUrlField} />
        <FormInputField field={adminVendorStore.businessAddressField} />
      </div>
    </Dialog>
  )
})

export default VendorFormDialog;
