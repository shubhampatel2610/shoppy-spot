import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import vendorProductStore from '../../stores/vendorProductStore';
import componentStore from '../../stores/componentStore';
import Pagination from '../../components/Pagination/Pagination';
import FormDropdownField from '../../components/common/FormDropdownField';
import SearchBox from '../../components/common/SearchBox';
import ProductRow from '../../components/Vendor/ProductRow';
import PageShell from '../../components/common/PageShell';
import { PRODUCT_STATUS_FILTER_OPTIONS } from '../../utils/vendorProductConstants';

const VendorProductListPage = observer(() => {
  const navigate = useNavigate();

  const handleDelete = (product) => {
    componentStore.openConfirmDialog({
      header: 'Delete Product',
      message: `Delete "${product.title}"? This cannot be undone.`,
      onConfirm: () => vendorProductStore.deleteProduct(product.id),
    });
  }

  const header = (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h1 className="text-lg font-bold text-gray-800">Products</h1>
          <p className="text-xs text-gray-400">{vendorProductStore.filteredProducts.length} product(s)</p>
        </div>
        <Button
          label="Add Product"
          icon="pi pi-plus"
          onClick={() => navigate('/vendor/products/new')}
          className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
        />
      </div>

      <div className="flex items-end gap-3 mb-4 flex-wrap">
        <SearchBox
          value={vendorProductStore.searchQuery}
          onChange={vendorProductStore.setSearchQuery}
          placeholder="Search products..."
          className="flex-1 min-w-48"
        />
        <div className="w-44">
          <FormDropdownField field={vendorProductStore.statusFilterField} options={PRODUCT_STATUS_FILTER_OPTIONS} />
        </div>
      </div>
    </>
  );

  return (
    <PageShell header={header}>
      {vendorProductStore.paginatedProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No products found.
        </div>
      ) : (
        <div className="space-y-3">
          {vendorProductStore.paginatedProducts.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onEdit={() => navigate(`/vendor/products/${product.id}/edit`)}
              onDelete={() => handleDelete(product)}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={vendorProductStore.currentPage}
        totalPages={vendorProductStore.totalPages}
        onPageChange={vendorProductStore.setPage}
      />
    </PageShell>
  )
})

export default VendorProductListPage;
