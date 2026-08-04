import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import vendorProductStore from '../../stores/vendorProductStore';
import FormInputField from '../../components/common/FormInputField';
import FormDropdownField from '../../components/common/FormDropdownField';
import CategoryComboField from '../../components/Vendor/CategoryComboField';
import VendorPageShell from '../../components/Vendor/VendorPageShell';

const STATUS_OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
];

const VendorProductFormPage = observer(() => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const toastRef = useRef(null);
  const isEditMode = Boolean(productId);

  useEffect(() => {
    if (isEditMode) {
      const found = vendorProductStore.loadProductIntoForm(productId);
      if (!found) {
        navigate('/vendor/products', { replace: true });
      }
    } else {
      vendorProductStore.resetForm();
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = vendorProductStore.saveProduct();
    if (success) {
      toastRef.current?.show({
        severity: 'success',
        summary: isEditMode ? 'Product updated' : 'Product added',
        life: 2000,
      });
      navigate('/vendor/products');
    }
  }

  const header = (
    <div className="flex items-center gap-3 mb-5">
      <Button
        icon="pi pi-arrow-left"
        aria-label="Back"
        onClick={() => navigate('/vendor/products')}
        outlined
        className="h-9 w-9 text-[#1e3a5f] border-[#1e3a5f]"
      />
      <div>
        <h1 className="text-lg font-bold text-gray-800">{isEditMode ? 'Edit Product' : 'Add Product'}</h1>
        <p className="text-xs text-gray-400">{isEditMode ? 'Update this product\'s details' : 'List a new product in your store'}</p>
      </div>
    </div>
  );

  return (
    <VendorPageShell header={header} className="max-w-3xl">
      <Toast ref={toastRef} />
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4" noValidate>
        <FormInputField field={vendorProductStore.titleField} />

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">{vendorProductStore.descriptionField.label}</label>
          <InputTextarea
            value={vendorProductStore.descriptionField.value}
            onChange={(e) => vendorProductStore.descriptionField.setValue(e.target.value)}
            onBlur={() => vendorProductStore.descriptionField.validate()}
            placeholder={vendorProductStore.descriptionField.placeholder}
            rows={3}
            className="w-full text-sm"
          />
          {vendorProductStore.descriptionField.error && (
            <p className="text-xs text-red-500 mt-1">{vendorProductStore.descriptionField.error}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CategoryComboField field={vendorProductStore.categoryField} categoryNames={vendorProductStore.categoryOptions} />
          <FormInputField field={vendorProductStore.brandField} />
          <FormInputField field={vendorProductStore.skuField} />
          <FormDropdownField field={vendorProductStore.statusField} options={STATUS_OPTIONS} />
          <FormInputField field={vendorProductStore.priceField} keyfilter="money" />
          <FormInputField field={vendorProductStore.discountField} keyfilter="num" />
          <FormInputField field={vendorProductStore.stockField} keyfilter="int" />
        </div>

        <FormInputField field={vendorProductStore.imagesField} />

        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            label="Cancel"
            outlined
            onClick={() => navigate('/vendor/products')}
            className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
          />
          <Button
            type="submit"
            label={isEditMode ? 'Save Changes' : 'Add Product'}
            className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
          />
        </div>
      </form>
    </VendorPageShell>
  )
})

export default VendorProductFormPage;
