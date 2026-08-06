import React from 'react';
import { observer } from 'mobx-react-lite';
import adminProductStore from '../../stores/adminProductStore';
import adminVendorStore from '../../stores/adminVendorStore';
import componentStore from '../../stores/componentStore';
import Pagination from '../../components/Pagination/Pagination';
import FormDropdownField from '../../components/common/FormDropdownField';
import SearchBox from '../../components/common/SearchBox';
import PageShell from '../../components/common/PageShell';
import AdminProductRow from '../../components/Admin/AdminProductRow';
import { PRODUCT_STATUS_FILTER_OPTIONS } from '../../utils/adminProductConstants';

const AdminProductListPage = observer(() => {
  const vendorOptions = [
    { label: 'All vendors', value: '' },
    ...adminVendorStore.vendors.map((v) => ({ label: v.storeName, value: v.id })),
  ];
  const vendorNameById = new Map(adminVendorStore.vendors.map((v) => [v.id, v.storeName]));

  const handleDelete = (product) => {
    componentStore.openConfirmDialog({
      header: 'Delete Product',
      message: `Remove "${product.title}" from the catalog? This cannot be undone.`,
      onConfirm: () => adminProductStore.deleteProduct(product.id),
    });
  }

  const handleToggleArchive = (product) => {
    const isArchived = product.status === 'archived';
    componentStore.openConfirmDialog({
      header: isArchived ? 'Unarchive Product' : 'Archive Product',
      message: `${isArchived ? 'Unarchive' : 'Archive'} "${product.title}"?`,
      onConfirm: () => adminProductStore.toggleArchive(product.id),
    });
  }

  const header = (
    <>
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-800">Products</h1>
        <p className="text-xs text-gray-400">{adminProductStore.filteredProducts.length} product(s) across all vendors</p>
      </div>

      <div className="flex items-end gap-3 mb-4 flex-wrap">
        <SearchBox
          value={adminProductStore.searchQuery}
          onChange={adminProductStore.setSearchQuery}
          placeholder="Search products..."
          className="flex-1 min-w-48"
        />
        <div className="w-48">
          <FormDropdownField field={adminProductStore.vendorFilterField} options={vendorOptions} />
        </div>
        <div className="w-40">
          <FormDropdownField field={adminProductStore.statusFilterField} options={PRODUCT_STATUS_FILTER_OPTIONS} />
        </div>
      </div>
    </>
  );

  return (
    <PageShell header={header}>
      {adminProductStore.paginatedProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No products found.
        </div>
      ) : (
        <div className="space-y-3">
          {adminProductStore.paginatedProducts.map((product) => (
            <AdminProductRow
              key={product.id}
              product={product}
              vendorName={vendorNameById.get(product.vendorId) ?? 'Unknown Vendor'}
              onToggleArchive={() => handleToggleArchive(product)}
              onDelete={() => handleDelete(product)}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={adminProductStore.currentPage}
        totalPages={adminProductStore.totalPages}
        onPageChange={adminProductStore.setPage}
      />
    </PageShell>
  )
})

export default AdminProductListPage;
