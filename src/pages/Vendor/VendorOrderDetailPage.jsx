import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import vendorOrderStore from '../../stores/vendorOrderStore';
import StatusBadge from '../../components/Vendor/StatusBadge';
import VendorPageShell from '../../components/Vendor/VendorPageShell';
import { ORDER_STATUS_BADGE_CLASS } from '../../utils/vendorOrderConstants';

const NEXT_STATUS_LABEL = {
  pending: 'Mark Packed',
  packed: 'Mark Shipped',
  shipped: 'Mark Delivered',
};

const VendorOrderDetailPage = observer(() => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = vendorOrderStore.getOrderById(orderId);

  useEffect(() => {
    if (!order) {
      navigate('/vendor/orders', { replace: true });
    }
  }, [order]);

  if (!order) {
    return null;
  }

  const header = (
    <div className="flex items-center gap-3 mb-5">
      <Button
        icon="pi pi-arrow-left"
        aria-label="Back"
        onClick={() => navigate('/vendor/orders')}
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
    <VendorPageShell header={header} className="max-w-3xl">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4">
        <h2 className="text-sm font-bold text-gray-800 mb-2">Customer & Shipping</h2>
        <p className="text-sm text-gray-700">{order.customerName}</p>
        <p className="text-sm text-gray-500">
          {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h2 className="text-sm font-bold text-gray-800 mb-3">Items</h2>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3 flex-wrap border-t border-gray-100 pt-3 first:border-0 first:pt-0">
              <div className="flex-1 min-w-40">
                <p className="text-sm font-medium text-gray-800">{item.productTitle}</p>
                <p className="text-xs text-gray-400">Qty {item.quantity} × ${item.unitPrice.toFixed(2)}</p>
              </div>
              <StatusBadge status={item.itemStatus} colorMap={ORDER_STATUS_BADGE_CLASS} />
              <span className="w-20 shrink-0 text-right text-sm font-semibold text-gray-800">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </span>
              {NEXT_STATUS_LABEL[item.itemStatus] && (
                <Button
                  label={NEXT_STATUS_LABEL[item.itemStatus]}
                  onClick={() => vendorOrderStore.advanceItemStatus(order.id, item.productId)}
                  outlined
                  className="h-8 text-xs text-[#1e3a5f] border-[#1e3a5f]"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 mt-3 border-t border-gray-100">
          <span className="text-sm font-bold text-gray-800">Total: ${order.total.toFixed(2)}</span>
        </div>
      </div>
    </VendorPageShell>
  )
})

export default VendorOrderDetailPage;
