import React from 'react';
import { Button } from 'primereact/button';

// Single category row for AdminCategoriesPage. `productCount` is computed by the
// page from adminProductStore.products and passed in - the count is shown right
// here, and it's also what disables the delete button below: a category still
// referenced by any product can't be deleted until it's reassigned away.
const CategoryRow = (props) => {
  const { category, productCount, onEdit, onDelete } = props;
  const isInUse = productCount > 0;

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-3">
      <div className="h-10 w-10 rounded-lg bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center shrink-0">
        <i className="pi pi-tag" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{category.name}</h3>
        <p className="text-xs text-gray-400 truncate">{category.slug} · {productCount} product(s)</p>
      </div>
      <div className="shrink-0 flex items-center gap-1">
        <Button icon="pi pi-pencil" aria-label="Edit" onClick={onEdit} text className="text-[#1e3a5f]" />
        <Button
          icon="pi pi-trash"
          aria-label="Delete"
          onClick={onDelete}
          title={isInUse ? 'Reassign products before deleting' : undefined}
          text
          severity="danger"
        />
      </div>
    </div>
  )
}

export default CategoryRow;
