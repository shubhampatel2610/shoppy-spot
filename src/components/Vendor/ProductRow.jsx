import React from 'react';
import { observer } from 'mobx-react-lite';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import vendorProductStore, { LOW_STOCK_THRESHOLD } from '../../stores/vendorProductStore';
import { PRODUCT_STATUS_BADGE_CLASS } from '../../utils/vendorProductConstants';
import StatusBadge from './StatusBadge';

// Single product row for VendorProductListPage - pulled into its own component so
// the list page stays a thin list + the row's presentation is reusable/testable on its own.
const ProductRow = observer((props) => {
  const { product, onEdit, onDelete } = props;
  const isLowStock = product.stock < LOW_STOCK_THRESHOLD && product.status === 'active';

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex-wrap">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="h-14 w-14 object-contain bg-gray-50 rounded-lg border border-gray-100 p-1 shrink-0"
      />

      <div className="flex-1 min-w-40">
        <h3 className="text-sm font-semibold text-gray-800 truncate flex items-center gap-1.5">
          {product.title}
          {isLowStock && <i className="pi pi-exclamation-triangle text-amber-500 text-xs" title="Low stock" />}
        </h3>
        <p className="text-xs text-gray-400 capitalize">{product.category?.replace(/-/g, ' ')} · SKU {product.sku || '—'}</p>
      </div>

      <span className="w-20 shrink-0 text-sm font-semibold text-gray-800">${product.price}</span>

      <InputNumber
        value={product.stock}
        onValueChange={(e) => vendorProductStore.updateStock(product.id, e.value ?? 0)}
        min={0}
        inputClassName="w-16 h-8 text-sm"
        showButtons={false}
      />

      <StatusBadge status={product.status} colorMap={PRODUCT_STATUS_BADGE_CLASS} />

      <div className="shrink-0 flex items-center gap-1">
        <Button icon="pi pi-pencil" aria-label="Edit" onClick={onEdit} text className="text-[#1e3a5f]" />
        <Button
          icon={product.status === 'archived' ? 'pi pi-refresh' : 'pi pi-box'}
          aria-label={product.status === 'archived' ? 'Unarchive' : 'Archive'}
          onClick={() => vendorProductStore.toggleArchive(product.id)}
          text
          className="text-gray-500"
        />
        <Button icon="pi pi-trash" aria-label="Delete" onClick={onDelete} text severity="danger" />
      </div>
    </div>
  )
})

export default ProductRow;
