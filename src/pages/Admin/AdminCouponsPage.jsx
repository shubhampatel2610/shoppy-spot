import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import adminCouponStore from '../../stores/adminCouponStore';
import componentStore from '../../stores/componentStore';
import PageShell from '../../components/common/PageShell';
import CouponRow from '../../components/Admin/CouponRow';
import CouponFormDialog from '../../components/Admin/CouponFormDialog';

// Small, unpaginated list - replaces the old hardcoded AppConstants.AVAILABLE_COUPONS
// (see adminCouponStore.js).
const AdminCouponsPage = observer(() => {
  const handleDelete = (coupon) => {
    componentStore.openConfirmDialog({
      header: 'Delete Coupon',
      message: `Delete coupon "${coupon.code}"? This cannot be undone.`,
      onConfirm: () => adminCouponStore.deleteCoupon(coupon.id),
    });
  }

  const handleToggleActive = (coupon) => {
    componentStore.openConfirmDialog({
      header: coupon.isActive ? 'Deactivate Coupon' : 'Activate Coupon',
      message: `${coupon.isActive ? 'Deactivate' : 'Activate'} coupon "${coupon.code}"?`,
      onConfirm: () => adminCouponStore.toggleActive(coupon.id),
    });
  }

  const header = (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
      <div>
        <h1 className="text-lg font-bold text-gray-800">Coupons</h1>
        <p className="text-xs text-gray-400">{adminCouponStore.coupons.length} coupon(s)</p>
      </div>
      <Button
        label="Add Coupon"
        icon="pi pi-plus"
        onClick={adminCouponStore.openAddForm}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <PageShell header={header}>
      {adminCouponStore.coupons.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No coupons yet.
        </div>
      ) : (
        <div className="space-y-3">
          {adminCouponStore.coupons.map((coupon) => (
            <CouponRow
              key={coupon.id}
              coupon={coupon}
              onEdit={() => adminCouponStore.openEditForm(coupon.id)}
              onToggleActive={() => handleToggleActive(coupon)}
              onDelete={() => handleDelete(coupon)}
            />
          ))}
        </div>
      )}

      <CouponFormDialog />
    </PageShell>
  )
})

export default AdminCouponsPage;
