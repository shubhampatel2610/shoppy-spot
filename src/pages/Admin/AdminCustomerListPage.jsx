import React from 'react';
import { observer } from 'mobx-react-lite';
import adminCustomerStore from '../../stores/adminCustomerStore';
import adminOrderStore from '../../stores/adminOrderStore';
import componentStore from '../../stores/componentStore';
import Pagination from '../../components/Pagination/Pagination';
import FormDropdownField from '../../components/common/FormDropdownField';
import SearchBox from '../../components/common/SearchBox';
import PageShell from '../../components/common/PageShell';
import CustomerRow from '../../components/Admin/CustomerRow';
import { CUSTOMER_STATUS_FILTER_OPTIONS } from '../../utils/adminCustomerConstants';

// Customers self-signup (see authStore.signup) so there's no "Add Customer" action
// here, unlike AdminVendorListPage - this page is moderation only.
const AdminCustomerListPage = observer(() => {
  const handleDelete = (customer) => {
    componentStore.openConfirmDialog({
      header: 'Delete Customer',
      message: `Delete "${customer.name}"'s account? This cannot be undone.`,
      onConfirm: () => adminCustomerStore.deleteCustomer(customer.id),
    });
  }

  const handleToggleActive = (customer) => {
    componentStore.openConfirmDialog({
      header: customer.isActive ? 'Suspend Customer' : 'Activate Customer',
      message: `${customer.isActive ? 'Suspend' : 'Activate'} "${customer.name}"'s account?`,
      onConfirm: () => adminCustomerStore.toggleActive(customer.id),
    });
  }

  const header = (
    <>
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-800">Customers</h1>
        <p className="text-xs text-gray-400">{adminCustomerStore.filteredCustomers.length} customer(s)</p>
      </div>

      <div className="flex items-end gap-3 mb-4 flex-wrap">
        <SearchBox
          value={adminCustomerStore.searchQuery}
          onChange={adminCustomerStore.setSearchQuery}
          placeholder="Search customers..."
          className="flex-1 min-w-48"
        />
        <div className="w-44">
          <FormDropdownField field={adminCustomerStore.statusFilterField} options={CUSTOMER_STATUS_FILTER_OPTIONS} />
        </div>
      </div>
    </>
  );

  return (
    <PageShell header={header}>
      {adminCustomerStore.paginatedCustomers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No customers found.
        </div>
      ) : (
        <div className="space-y-3">
          {adminCustomerStore.paginatedCustomers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              stats={adminCustomerStore.getCustomerStats(customer.id, adminOrderStore.orders)}
              onToggleActive={() => handleToggleActive(customer)}
              onDelete={() => handleDelete(customer)}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={adminCustomerStore.currentPage}
        totalPages={adminCustomerStore.totalPages}
        onPageChange={adminCustomerStore.setPage}
      />
    </PageShell>
  )
})

export default AdminCustomerListPage;
