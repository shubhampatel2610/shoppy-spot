import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import adminVendorStore from '../../stores/adminVendorStore';
import adminProductStore from '../../stores/adminProductStore';
import adminOrderStore from '../../stores/adminOrderStore';
import componentStore from '../../stores/componentStore';
import Pagination from '../../components/Pagination/Pagination';
import FormDropdownField from '../../components/common/FormDropdownField';
import SearchBox from '../../components/common/SearchBox';
import PageShell from '../../components/common/PageShell';
import VendorRow from '../../components/Admin/VendorRow';
import VendorFormDialog from '../../components/Admin/VendorFormDialog';
import { VENDOR_STATUS_FILTER_OPTIONS } from '../../utils/adminVendorConstants';

const AdminVendorListPage = observer(() => {
  const navigate = useNavigate();

  const handleDelete = (vendor) => {
    componentStore.openConfirmDialog({
      header: 'Delete Vendor',
      message: `Delete "${vendor.storeName}"? This cannot be undone.`,
      onConfirm: () => adminVendorStore.deleteVendor(vendor.id),
    });
  }

  const handleToggleActive = (vendor) => {
    componentStore.openConfirmDialog({
      header: vendor.isActive ? 'Suspend Vendor' : 'Activate Vendor',
      message: `${vendor.isActive ? 'Suspend' : 'Activate'} "${vendor.storeName}"?`,
      onConfirm: () => adminVendorStore.toggleActive(vendor.id),
    });
  }

  const header = (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Vendors</h1>
          <p className="text-xs text-gray-400">{adminVendorStore.filteredVendors.length} vendor(s)</p>
        </div>
        <Button
          label="Add Vendor"
          icon="pi pi-plus"
          onClick={adminVendorStore.openAddForm}
          className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
        />
      </div>

      <div className="flex items-end gap-3 mb-4 flex-wrap">
        <SearchBox
          value={adminVendorStore.searchQuery}
          onChange={adminVendorStore.setSearchQuery}
          placeholder="Search vendors..."
          className="flex-1 min-w-48"
        />
        <div className="w-44">
          <FormDropdownField field={adminVendorStore.statusFilterField} options={VENDOR_STATUS_FILTER_OPTIONS} />
        </div>
      </div>
    </>
  );

  return (
    <PageShell header={header}>
      {adminVendorStore.paginatedVendors.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No vendors found.
        </div>
      ) : (
        <div className="space-y-3">
          {adminVendorStore.paginatedVendors.map((vendor) => (
            <VendorRow
              key={vendor.id}
              vendor={vendor}
              stats={adminVendorStore.getVendorStats(vendor.id, adminProductStore.products, adminOrderStore.orders)}
              onView={() => navigate(`/admin/vendors/${vendor.id}`)}
              onEdit={() => adminVendorStore.openEditForm(vendor.id)}
              onToggleActive={() => handleToggleActive(vendor)}
              onDelete={() => handleDelete(vendor)}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={adminVendorStore.currentPage}
        totalPages={adminVendorStore.totalPages}
        onPageChange={adminVendorStore.setPage}
      />

      <VendorFormDialog />
    </PageShell>
  )
})

export default AdminVendorListPage;
