import React from 'react';
import { Button } from 'primereact/button';
import StatusBadge from '../common/StatusBadge';
import { VENDOR_STATUS_BADGE_CLASS, vendorStatusLabel } from '../../utils/adminVendorConstants';

// Single vendor row for AdminVendorListPage. `stats` (productCount/orderCount/revenue)
// is computed by the page via adminVendorStore.getVendorStats and passed in, keeping
// this component purely presentational - same split VendorProductStore/ProductRow uses.
//
// Below md this stacks into grouped lines like ProductRow does, using `md:contents`
// so at md and up every element becomes a direct child of the same flex row.
const VendorRow = (props) => {
  const { vendor, stats, onView, onEdit, onToggleActive, onDelete } = props;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-3 md:flex-wrap">
      <div className="flex items-center gap-3 md:contents">
        <div className="h-11 w-11 rounded-lg bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center shrink-0 font-bold">
          {vendor.storeName?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0 md:min-w-44">
          <h3 className="text-sm font-semibold text-gray-800 truncate">{vendor.storeName}</h3>
          <p className="text-xs text-gray-400 truncate">{vendor.ownerName} · {vendor.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-between md:contents">
        <div className="text-xs text-gray-500 md:w-40 md:shrink-0">
          <p>{stats.productCount} product(s) · {stats.orderCount} order(s)</p>
          <p className="font-semibold text-gray-700">${stats.revenue.toFixed(2)} revenue</p>
        </div>
        <StatusBadge status={vendorStatusLabel(vendor.isActive)} colorMap={VENDOR_STATUS_BADGE_CLASS} />
      </div>

      <div className="flex items-center justify-end gap-1 md:contents">
        <Button icon="pi pi-eye" aria-label="View" onClick={onView} text className="text-[#1e3a5f]" />
        <Button icon="pi pi-pencil" aria-label="Edit" onClick={onEdit} text className="text-[#1e3a5f]" />
        <Button
          icon={vendor.isActive ? 'pi pi-ban' : 'pi pi-refresh'}
          aria-label={vendor.isActive ? 'Suspend' : 'Activate'}
          onClick={onToggleActive}
          text
          className="text-gray-500"
        />
        <Button icon="pi pi-trash" aria-label="Delete" onClick={onDelete} text severity="danger" />
      </div>
    </div>
  )
}

export default VendorRow;
