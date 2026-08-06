import React from 'react';
import { observer } from 'mobx-react-lite';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import vendorProductStore, { LOW_STOCK_THRESHOLD } from '../../stores/vendorProductStore';
import componentStore from '../../stores/componentStore';
import { PRODUCT_STATUS_BADGE_CLASS } from '../../utils/vendorProductConstants';
import StatusBadge from '../common/StatusBadge';

// Single product row for VendorProductListPage - pulled into its own component so
// the list page stays a thin list + the row's presentation is reusable/testable on its own.
//
// Below md this stacks into three grouped lines (image+title / price+status /
// stock+actions) since the original single-line layout overflows on a phone
// width. Each group uses `md:contents` so at md and up the wrapper divs drop out
// of layout entirely and every element becomes a direct child of the same flex
// row it was in before - the desktop DOM/CSS result is unchanged.
const ProductRow = observer((props) => {
  const { product, onEdit, onDelete } = props;
  const isLowStock = product.stock < LOW_STOCK_THRESHOLD && product.status === 'active';
  const isArchived = product.status === 'archived';

  const handleToggleArchive = () => {
    componentStore.openConfirmDialog({
      header: isArchived ? 'Unarchive Product' : 'Archive Product',
      message: `${isArchived ? 'Unarchive' : 'Archive'} "${product.title}"?`,
      onConfirm: () => vendorProductStore.toggleArchive(product.id),
    });
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-3 md:flex-wrap">
      <div className="flex items-center gap-3 md:contents">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="h-14 w-14 object-contain bg-gray-50 rounded-lg border border-gray-100 p-1 shrink-0"
        />

        <div className="flex-1 min-w-0 md:min-w-40">
          <h3 className="text-sm font-semibold text-gray-800 truncate flex items-center gap-1.5">
            {product.title}
            {isLowStock && <i className="pi pi-exclamation-triangle text-amber-500 text-xs shrink-0" title="Low stock" />}
          </h3>
          <p className="text-xs text-gray-400 capitalize truncate">{product.category?.replace(/-/g, ' ')} · SKU {product.sku || '—'}</p>
        </div>
      </div>

      <div className="flex items-center justify-between md:contents">
        <span className="text-sm font-semibold text-gray-800 md:w-20 md:shrink-0">${product.price}</span>
        <StatusBadge status={product.status} colorMap={PRODUCT_STATUS_BADGE_CLASS} />
      </div>

      <div className="flex items-center justify-between md:contents">
        <InputNumber
          value={product.stock}
          onValueChange={(e) => vendorProductStore.updateStock(product.id, e.value ?? 0)}
          min={0}
          inputClassName="w-16 h-8 text-sm"
          showButtons={false}
        />

        <div className="shrink-0 flex items-center gap-1">
          <Button icon="pi pi-pencil" aria-label="Edit" onClick={onEdit} text className="text-[#1e3a5f]" />
          <Button
            icon={isArchived ? 'pi pi-refresh' : 'pi pi-box'}
            aria-label={isArchived ? 'Unarchive' : 'Archive'}
            onClick={handleToggleArchive}
            text
            className="text-gray-500"
          />
          <Button icon="pi pi-trash" aria-label="Delete" onClick={onDelete} text severity="danger" />
        </div>
      </div>
    </div>
  )
})

export default ProductRow;
