import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import adminOrderStore from '../../stores/adminOrderStore';
import PageShell from '../../components/common/PageShell';
import StatusBadge from '../../components/common/StatusBadge';
import {
  ORDER_STATUS_FILTER_OPTIONS,
  PAYMENT_STATUS_FILTER_OPTIONS,
  ITEM_STATUS_BADGE_CLASS,
} from '../../utils/adminOrderConstants';

// Drops the leading "All statuses"/"All payment statuses" entry from the filter
// option lists - editing an order needs a concrete value, not a wildcard.
const ORDER_STATUS_EDIT_OPTIONS = ORDER_STATUS_FILTER_OPTIONS.slice(1);
const PAYMENT_STATUS_EDIT_OPTIONS = PAYMENT_STATUS_FILTER_OPTIONS.slice(1);

const AdminOrderDetailPage = observer(() => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = adminOrderStore.getOrderById(orderId);

  useEffect(() => {
    if (!order) {
      navigate('/admin/orders', { replace: true });
    }
  }, [order]);

  if (!order) {
    return null;
  }

  const itemsByVendor = new Map();
  order.items.forEach((item) => {
    const group = itemsByVendor.get(item.vendorId) ?? { vendorName: item.vendorName, items: [] };
    group.items.push(item);
    itemsByVendor.set(item.vendorId, group);
  });

  const header = (
    <div className="flex items-center gap-3 mb-5">
      <Button
        icon="pi pi-arrow-left"
        aria-label="Back"
        onClick={() => navigate('/admin/orders')}
        outlined
        className="h-9 w-9 text-[#1e3a5f] border-[#1e3a5f]"
      />
      <div>
        <h1 className="text-lg font-bold text-gray-800">Order {order.id}</h1>
        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );

  return (
    <PageShell header={header}>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <h2 className="text-sm font-bold text-gray-800 mb-2">Customer & Shipping</h2>
        <p className="text-sm text-gray-700">{order.customerName}</p>
        <p className="text-sm text-gray-500">
          {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Order Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Order Status</label>
            <Dropdown
              value={order.orderStatus}
              options={ORDER_STATUS_EDIT_OPTIONS}
              optionLabel="label"
              optionValue="value"
              onChange={(e) => adminOrderStore.updateOrderStatus(order.id, e.value)}
              className="w-full text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Payment Status</label>
            <Dropdown
              value={order.paymentStatus}
              options={PAYMENT_STATUS_EDIT_OPTIONS}
              optionLabel="label"
              optionValue="value"
              onChange={(e) => adminOrderStore.updatePaymentStatus(order.id, e.value)}
              className="w-full text-sm"
            />
          </div>
        </div>
      </div>

      {[...itemsByVendor.values()].map((group) => (
        <div key={group.vendorName} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
          <h2 className="text-sm font-bold text-[#1e3a5f] mb-3">{group.vendorName}</h2>
          <div className="space-y-3">
            {group.items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3 flex-wrap border-t border-gray-100 pt-3 first:border-0 first:pt-0">
                <div className="flex-1 min-w-40">
                  <p className="text-sm font-medium text-gray-800">{item.productTitle}</p>
                  <p className="text-xs text-gray-400">Qty {item.quantity} × ${item.unitPrice.toFixed(2)}</p>
                </div>
                <StatusBadge status={item.itemStatus} colorMap={ITEM_STATUS_BADGE_CLASS} />
                <span className="w-20 shrink-0 text-right text-sm font-semibold text-gray-800">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex justify-end">
          <span className="text-sm font-bold text-gray-800">Total: ${order.total.toFixed(2)}</span>
        </div>
      </div>
    </PageShell>
  )
})

export default AdminOrderDetailPage;
