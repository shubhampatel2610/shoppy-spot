import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { ORDER_STATUS_BADGE_CLASS } from '../../utils/vendorOrderConstants';
import StatusBadge from './StatusBadge';

// Single order row for VendorOrderListPage.
const OrderCard = (props) => {
  const { order } = props;
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-sm font-semibold text-gray-800">{order.customerName}</p>
          <p className="text-xs text-gray-400">
            {order.shippingAddress.city}, {order.shippingAddress.state} · {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-800">${order.total.toFixed(2)}</span>
          <Button
            label="View"
            icon="pi pi-eye"
            onClick={() => navigate(`/vendor/orders/${order.id}`)}
            text
            className="h-8 text-sm text-[#1e3a5f]"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-2">
        {order.items.map((item) => (
          <span key={item.productId} className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-full pl-2.5 pr-1 py-1">
            {item.productTitle}
            <StatusBadge status={item.itemStatus} colorMap={ORDER_STATUS_BADGE_CLASS} />
          </span>
        ))}
      </div>
    </div>
  )
}

export default OrderCard;
