import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import QuantityStepper from '../common/QuantityStepper';
import cartStore from '../../stores/cartStore';
import AppConstants from '../../utils/AppConstants';

const CartItemRow = observer((props) => {
  const { item } = props;

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-3">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="h-16 w-16 object-contain bg-gray-50 rounded-lg border border-gray-100 p-1 shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{item.title}</h3>
        <p className="text-sm text-gray-500">${item.price}</p>
      </div>

      <QuantityStepper
        value={item.quantity}
        onChange={(qty) => cartStore.setQuantity(item.id, qty)}
        min={1}
        max={item.stock || undefined}
      />

      <span className="w-16 shrink-0 text-right text-sm font-semibold text-gray-800">
        ${(item.price * item.quantity).toFixed(2)}
      </span>

      <Button
        icon="pi pi-trash"
        aria-label={AppConstants.REMOVE_LABEL}
        onClick={() => cartStore.removeFromCart(item.id)}
        text
        severity="danger"
      />
    </div>
  )
})

export default CartItemRow;
