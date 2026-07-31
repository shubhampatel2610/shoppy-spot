import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import userStore from '../../stores/userStore';
import AppConstants from '../../utils/AppConstants';
import FormInputField from '../common/FormInputField';

// Dialog to edit address fields, prefilled from the current saved address
const EditAddressDialog = observer(() => {
  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={AppConstants.CANCEL_LABEL}
        outlined
        onClick={userStore.closeAddressDialog}
        className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
      />
      <Button
        label={AppConstants.SAVE_LABEL}
        onClick={userStore.saveAddress}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header={AppConstants.EDIT_ADDRESS_TITLE}
      visible={userStore.isAddressDialogOpen}
      onHide={userStore.closeAddressDialog}
      footer={footer}
      className="w-full max-w-2xl mx-4"
      blockScroll
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <FormInputField field={userStore.buildingNoField} />
        <FormInputField field={userStore.streetNameField} />
        <FormInputField field={userStore.landmarkField} />
        <FormInputField field={userStore.cityField} />
        <FormInputField field={userStore.pincodeField} keyfilter="num" />
        <FormInputField field={userStore.stateField} />
        <FormInputField field={userStore.countryField} />
      </div>
    </Dialog>
  )
})

export default EditAddressDialog;
