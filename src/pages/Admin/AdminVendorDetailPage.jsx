import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import adminVendorStore from '../../stores/adminVendorStore';
import adminProductStore from '../../stores/adminProductStore';
import adminOrderStore from '../../stores/adminOrderStore';
import PageShell from '../../components/common/PageShell';
import StatusBadge from '../../components/common/StatusBadge';
import { VENDOR_STATUS_BADGE_CLASS, vendorStatusLabel } from '../../utils/adminVendorConstants';
import { PRODUCT_STATUS_BADGE_CLASS } from '../../utils/adminProductConstants';

// Read-only drill-down into a single vendor - profile summary plus their products
// and recent orders, same shell pattern as VendorOrderDetailPage.
const AdminVendorDetailPage = observer(() => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const vendor = adminVendorStore.getVendorById(vendorId);

  useEffect(() => {
    if (!vendor) {
      navigate('/admin/vendors', { replace: true });
    }
  }, [vendor]);

  if (!vendor) {
    return null;
  }

  const stats = adminVendorStore.getVendorStats(vendorId, adminProductStore.products, adminOrderStore.orders);
  const vendorProducts = adminProductStore.products.filter((p) => p.vendorId === vendorId);
  const vendorOrders = adminOrderStore.orders.filter((o) => o.items.some((item) => item.vendorId === vendorId)).slice(0, 8);

  const header = (
    <div className="flex items-center gap-3 mb-5">
      <Button
        icon="pi pi-arrow-left"
        aria-label="Back"
        onClick={() => navigate('/admin/vendors')}
        outlined
        className="h-9 w-9 text-[#1e3a5f] border-[#1e3a5f]"
      />
      <div>
        <h1 className="text-lg font-bold text-gray-800">{vendor.storeName}</h1>
        <p className="text-xs text-gray-400">Vendor since {new Date(vendor.joinedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );

  return (
    <PageShell header={header}>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
          <div>
            <p className="text-sm font-semibold text-gray-800">{vendor.ownerName}</p>
            <p className="text-xs text-gray-500">{vendor.email} · {vendor.phone}</p>
            <p className="text-xs text-gray-400 mt-1">{vendor.businessAddress}</p>
          </div>
          <StatusBadge status={vendorStatusLabel(vendor.isActive)} colorMap={VENDOR_STATUS_BADGE_CLASS} />
        </div>
        {vendor.storeDescription && <p className="text-sm text-gray-600 border-t border-gray-100 pt-3">{vendor.storeDescription}</p>}
        <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-3 mt-3 text-center">
          <div>
            <p className="text-base font-bold text-gray-800">{stats.productCount}</p>
            <p className="text-xs text-gray-400">Products</p>
          </div>
          <div>
            <p className="text-base font-bold text-gray-800">{stats.orderCount}</p>
            <p className="text-xs text-gray-400">Orders</p>
          </div>
          <div>
            <p className="text-base font-bold text-gray-800">${stats.revenue.toFixed(2)}</p>
            <p className="text-xs text-gray-400">Revenue</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Products</h2>
        {vendorProducts.length === 0 ? (
          <p className="text-sm text-gray-400">No products listed yet.</p>
        ) : (
          <div className="space-y-2">
            {vendorProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between gap-3 border-t border-gray-100 pt-2 first:border-0 first:pt-0">
                <span className="text-sm text-gray-700 truncate">{product.title}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-medium text-gray-800">${product.price}</span>
                  <StatusBadge status={product.status} colorMap={PRODUCT_STATUS_BADGE_CLASS} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Recent Orders</h2>
        {vendorOrders.length === 0 ? (
          <p className="text-sm text-gray-400">No orders yet.</p>
        ) : (
          <div className="space-y-2">
            {vendorOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between gap-3 border-t border-gray-100 pt-2 first:border-0 first:pt-0">
                <span className="text-sm text-gray-700">{order.customerName} · {new Date(order.createdAt).toLocaleDateString()}</span>
                <span className="text-sm font-medium text-gray-800 shrink-0">${order.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  )
})

export default AdminVendorDetailPage;
