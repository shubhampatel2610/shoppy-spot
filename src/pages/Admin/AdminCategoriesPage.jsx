import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import adminCategoryStore from '../../stores/adminCategoryStore';
import adminProductStore from '../../stores/adminProductStore';
import componentStore from '../../stores/componentStore';
import PageShell from '../../components/common/PageShell';
import CategoryRow from '../../components/Admin/CategoryRow';
import CategoryFormDialog from '../../components/Admin/CategoryFormDialog';

// Small, unpaginated list - the canonical category taxonomy shared with the
// vendor product form (see adminCategoryStore.js's storage-key comment).
const AdminCategoriesPage = observer(() => {
  const productCountBySlug = new Map();
  adminProductStore.products.forEach((p) => {
    productCountBySlug.set(p.category, (productCountBySlug.get(p.category) ?? 0) + 1);
  });

  // The product count is already shown right on the row, so the in-use check
  // happens here on the frontend rather than round-tripping to "the backend" first -
  // the delete button itself is disabled in CategoryRow whenever productCount > 0,
  // and this stays as a defensive fallback. Only a category with 0 products ever
  // reaches deleteCategory (the mock "API call").
  const handleDelete = (category) => {
    const productCount = productCountBySlug.get(category.slug) ?? 0;
    if (productCount > 0) {
      componentStore.openConfirmDialog({
        header: 'Cannot Delete Category',
        message: `${productCount} product(s) still use "${category.name}". Reassign them before deleting.`,
        showCancel: false,
      });
      return;
    }
    componentStore.openConfirmDialog({
      header: 'Delete Category',
      message: `Delete "${category.name}"? This cannot be undone.`,
      onConfirm: () => adminCategoryStore.deleteCategory(category.id, productCount),
    });
  }

  const header = (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
      <div>
        <h1 className="text-lg font-bold text-gray-800">Categories</h1>
        <p className="text-xs text-gray-400">{adminCategoryStore.categories.length} categor{adminCategoryStore.categories.length !== 1 ? 'ies' : 'y'}</p>
      </div>
      <Button
        label="Add Category"
        icon="pi pi-plus"
        onClick={adminCategoryStore.openAddForm}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <PageShell header={header}>
      {adminCategoryStore.categories.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
          No categories yet.
        </div>
      ) : (
        <div className="space-y-3">
          {adminCategoryStore.categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              productCount={productCountBySlug.get(category.slug) ?? 0}
              onEdit={() => adminCategoryStore.openEditForm(category.id)}
              onDelete={() => handleDelete(category)}
            />
          ))}
        </div>
      )}

      <CategoryFormDialog />
    </PageShell>
  )
})

export default AdminCategoriesPage;
