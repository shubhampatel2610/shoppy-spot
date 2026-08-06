import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import StatusBadge from '../common/StatusBadge';
import { ORDER_STATUS_BADGE_CLASS, PAYMENT_STATUS_BADGE_CLASS } from '../../utils/adminOrderConstants';

// Single order row for AdminOrderListPage - shows the order-level orderStatus/
// paymentStatus (see database/schema.sql) that only the admin side surfaces,
// plus which vendor(s) are involved since an order can span more than one.
const AdminOrderCard = (props) => {
  const { order } = props;
  const navigate = useNavigate();
  const vendorNames = [...new Set(order.items.map((item) => item.vendorName))];

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
            onClick={() => navigate(`/admin/orders/${order.id}`)}
            text
            className="h-8 text-sm text-[#1e3a5f]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        <StatusBadge status={order.orderStatus} colorMap={ORDER_STATUS_BADGE_CLASS} />
        <StatusBadge status={order.paymentStatus} colorMap={PAYMENT_STATUS_BADGE_CLASS} />
        <span className="text-xs text-gray-400 ml-1">{vendorNames.join(', ')}</span>
      </div>
    </div>
  )
}

export default AdminOrderCard;
