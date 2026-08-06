import React from 'react';
import { Button } from 'primereact/button';
import StatusBadge from '../common/StatusBadge';

const COUPON_STATUS_BADGE_CLASS = {
  active: 'bg-green-50 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
};

const CouponRow = (props) => {
  const { coupon, onEdit, onToggleActive, onDelete } = props;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-3 md:flex-wrap">
      <div className="flex items-center gap-3 md:contents">
        <div className="h-11 w-11 rounded-lg bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center shrink-0">
          <i className="pi pi-ticket" />
        </div>
        <div className="flex-1 min-w-0 md:min-w-44">
          <h3 className="text-sm font-semibold text-gray-800 truncate">{coupon.code}</h3>
          <p className="text-xs text-gray-400 truncate">{coupon.label}</p>
        </div>
      </div>

      <div className="flex items-center justify-between md:contents">
        <p className="text-xs text-gray-500 md:w-40 md:shrink-0">
          Expires {new Date(coupon.expiresAt).toLocaleDateString()}
        </p>
        <StatusBadge status={coupon.isActive ? 'active' : 'inactive'} colorMap={COUPON_STATUS_BADGE_CLASS} />
      </div>

      <div className="flex items-center justify-end gap-1 md:contents">
        <Button icon="pi pi-pencil" aria-label="Edit" onClick={onEdit} text className="text-[#1e3a5f]" />
        <Button
          icon={coupon.isActive ? 'pi pi-eye-slash' : 'pi pi-eye'}
          aria-label={coupon.isActive ? 'Deactivate' : 'Activate'}
          onClick={onToggleActive}
          text
          className="text-gray-500"
        />
        <Button icon="pi pi-trash" aria-label="Delete" onClick={onDelete} text severity="danger" />
      </div>
    </div>
  )
}

export default CouponRow;
