import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import vendorProfileStore from '../../stores/vendorProfileStore';
import FormInputField from '../../components/common/FormInputField';
import VendorPageShell from '../../components/Vendor/VendorPageShell';

const VendorSettingsPage = observer(() => {
  const toastRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = vendorProfileStore.saveProfile();
    if (success) {
      toastRef.current?.show({ severity: 'success', summary: 'Store settings saved', life: 2000 });
    }
  }

  const header = (
    <div className="mb-5">
      <h1 className="text-lg font-bold text-gray-800">Store Settings</h1>
      <p className="text-xs text-gray-400">Manage how your store appears to customers</p>
    </div>
  );

  return (
    <VendorPageShell header={header} className="max-w-2xl">
      <Toast ref={toastRef} />
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4" noValidate>
        <FormInputField field={vendorProfileStore.storeNameField} />
        <FormInputField field={vendorProfileStore.storeDescriptionField} />
        <FormInputField field={vendorProfileStore.logoUrlField} />
        <FormInputField field={vendorProfileStore.businessAddressField} />
        <FormInputField field={vendorProfileStore.phoneField} keyfilter="num" />

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            label="Save Changes"
            className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
          />
        </div>
      </form>
    </VendorPageShell>
  )
})

export default VendorSettingsPage;
