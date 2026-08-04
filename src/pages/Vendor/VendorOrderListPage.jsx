import React from 'react';
import { observer } from 'mobx-react-lite';
import vendorOrderStore from '../../stores/vendorOrderStore';
import Pagination from '../../components/Pagination/Pagination';
import FormDropdownField from '../../components/common/FormDropdownField';
import OrderCard from '../../components/Vendor/OrderCard';
import VendorPageShell from '../../components/Vendor/VendorPageShell';
import { ORDER_STATUS_FILTER_OPTIONS } from '../../utils/vendorOrderConstants';

const VendorOrderListPage = observer(() => {
  const header = (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
      <div>
        <h1 className="text-lg font-bold text-gray-800">Orders</h1>
        <p className="text-xs text-gray-400">{vendorOrderStore.filteredOrders.length} order(s)</p>
      </div>
      <div className="w-48">
        <FormDropdownField field={vendorOrderStore.statusFilterField} options={ORDER_STATUS_FILTER_OPTIONS} />
      </div>
    </div>
  );

  return (
    <VendorPageShell header={header}>
      {vendorOrderStore.paginatedOrders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No orders found.
        </div>
      ) : (
        <div className="space-y-3">
          {vendorOrderStore.paginatedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={vendorOrderStore.currentPage}
        totalPages={vendorOrderStore.totalPages}
        onPageChange={vendorOrderStore.setPage}
      />
    </VendorPageShell>
  )
})

export default VendorOrderListPage;
