import React from 'react';
import { Button } from 'primereact/button';
import StatusBadge from '../common/StatusBadge';
import { PRODUCT_STATUS_BADGE_CLASS } from '../../utils/adminProductConstants';

// Single product row for AdminProductListPage. Admin is a moderator here, not an
// owner - only status (archive/reinstate) and delete are exposed, unlike
// ProductRow.jsx's stock editor and full edit link on the vendor side.
// `vendorName` is resolved by the page (adminVendorStore.getVendorById) and
// passed in so this row stays purely presentational.
const AdminProductRow = (props) => {
  const { product, vendorName, onToggleArchive, onDelete } = props;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-3 md:flex-wrap">
      <div className="flex items-center gap-3 md:contents">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="h-14 w-14 object-contain bg-gray-50 rounded-lg border border-gray-100 p-1 shrink-0"
        />
        <div className="flex-1 min-w-0 md:min-w-40">
          <h3 className="text-sm font-semibold text-gray-800 truncate">{product.title}</h3>
          <p className="text-xs text-gray-400 truncate">{vendorName} · {product.category?.replace(/-/g, ' ')}</p>
        </div>
      </div>

      <div className="flex items-center justify-between md:contents">
        <span className="text-sm font-semibold text-gray-800 md:w-20 md:shrink-0">${product.price}</span>
        <StatusBadge status={product.status} colorMap={PRODUCT_STATUS_BADGE_CLASS} />
      </div>

      <div className="flex items-center justify-end gap-1 md:contents">
        <Button
          icon={product.status === 'archived' ? 'pi pi-refresh' : 'pi pi-box'}
          aria-label={product.status === 'archived' ? 'Unarchive' : 'Archive'}
          onClick={onToggleArchive}
          text
          className="text-gray-500"
        />
        <Button icon="pi pi-trash" aria-label="Delete" onClick={onDelete} text severity="danger" />
      </div>
    </div>
  )
}

export default AdminProductRow;
