import React from 'react';
import { observer } from 'mobx-react-lite';
import adminOrderStore from '../../stores/adminOrderStore';
import adminVendorStore from '../../stores/adminVendorStore';
import Pagination from '../../components/Pagination/Pagination';
import FormDropdownField from '../../components/common/FormDropdownField';
import PageShell from '../../components/common/PageShell';
import AdminOrderCard from '../../components/Admin/AdminOrderCard';
import { ORDER_STATUS_FILTER_OPTIONS, PAYMENT_STATUS_FILTER_OPTIONS } from '../../utils/adminOrderConstants';

const AdminOrderListPage = observer(() => {
  const vendorOptions = [
    { label: 'All vendors', value: '' },
    ...adminVendorStore.vendors.map((v) => ({ label: v.storeName, value: v.id })),
  ];

  const header = (
    <>
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-800">Orders</h1>
        <p className="text-xs text-gray-400">{adminOrderStore.filteredOrders.length} order(s) across all vendors</p>
      </div>

      <div className="flex items-end gap-3 mb-4 flex-wrap">
        <div className="w-48">
          <FormDropdownField field={adminOrderStore.vendorFilterField} options={vendorOptions} />
        </div>
        <div className="w-44">
          <FormDropdownField field={adminOrderStore.statusFilterField} options={ORDER_STATUS_FILTER_OPTIONS} />
        </div>
        <div className="w-48">
          <FormDropdownField field={adminOrderStore.paymentFilterField} options={PAYMENT_STATUS_FILTER_OPTIONS} />
        </div>
      </div>
    </>
  );

  return (
    <PageShell header={header}>
      {adminOrderStore.paginatedOrders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No orders found.
        </div>
      ) : (
        <div className="space-y-3">
          {adminOrderStore.paginatedOrders.map((order) => (
            <AdminOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={adminOrderStore.currentPage}
        totalPages={adminOrderStore.totalPages}
        onPageChange={adminOrderStore.setPage}
      />
    </PageShell>
  )
})

export default AdminOrderListPage;
