import React from 'react';
import { Button } from 'primereact/button';
import StatusBadge from '../common/StatusBadge';
import { CUSTOMER_STATUS_BADGE_CLASS, customerStatusLabel } from '../../utils/adminCustomerConstants';

// Single customer row for AdminCustomerListPage. `stats` (orderCount/totalSpent) is
// computed by the page via adminCustomerStore.getCustomerStats and passed in - same
// decoupled-stats pattern as VendorRow.
const CustomerRow = (props) => {
  const { customer, stats, onToggleActive, onDelete } = props;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-3 md:flex-wrap">
      <div className="flex items-center gap-3 md:contents">
        <div className="h-11 w-11 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center shrink-0 font-bold">
          {customer.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0 md:min-w-44">
          <h3 className="text-sm font-semibold text-gray-800 truncate">{customer.name}</h3>
          <p className="text-xs text-gray-400 truncate">{customer.email} · {customer.phone}</p>
        </div>
      </div>

      <div className="flex items-center justify-between md:contents">
        <div className="text-xs text-gray-500 md:w-36 md:shrink-0">
          <p>{stats.orderCount} order(s)</p>
          <p className="font-semibold text-gray-700">${stats.totalSpent.toFixed(2)} spent</p>
        </div>
        <StatusBadge status={customerStatusLabel(customer.isActive)} colorMap={CUSTOMER_STATUS_BADGE_CLASS} />
      </div>

      <div className="flex items-center justify-end gap-1 md:contents">
        <Button
          icon={customer.isActive ? 'pi pi-ban' : 'pi pi-refresh'}
          aria-label={customer.isActive ? 'Suspend' : 'Activate'}
          onClick={onToggleActive}
          text
          className="text-gray-500"
        />
        <Button icon="pi pi-trash" aria-label="Delete" onClick={onDelete} text severity="danger" />
      </div>
    </div>
  )
}

export default CustomerRow;
