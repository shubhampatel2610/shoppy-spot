import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import adminCouponStore from '../../stores/adminCouponStore';
import AppConstants from '../../utils/AppConstants';
import FormInputField from '../common/FormInputField';
import FormDropdownField from '../common/FormDropdownField';

const TYPE_OPTIONS = [
  { label: 'Percent off', value: 'percent' },
  { label: 'Flat amount off', value: 'flat' },
];

const CouponFormDialog = observer(() => {
  const isEditMode = Boolean(adminCouponStore.editingCouponId);

  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={AppConstants.CANCEL_LABEL}
        outlined
        onClick={adminCouponStore.closeForm}
        className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
      />
      <Button
        label={isEditMode ? 'Save Changes' : 'Add Coupon'}
        onClick={adminCouponStore.saveCoupon}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header={isEditMode ? 'Edit Coupon' : 'Add Coupon'}
      visible={adminCouponStore.isFormOpen}
      onHide={adminCouponStore.closeForm}
      footer={footer}
      className="w-full max-w-lg mx-4"
      blockScroll
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <FormInputField field={adminCouponStore.codeField} />
        <FormDropdownField field={adminCouponStore.typeField} options={TYPE_OPTIONS} />
        <FormInputField field={adminCouponStore.valueField} keyfilter="num" />
        <FormInputField field={adminCouponStore.expiresAtField} />
        <div className="sm:col-span-2">
          <FormInputField field={adminCouponStore.labelField} />
        </div>
      </div>
    </Dialog>
  )
})

export default CouponFormDialog;
