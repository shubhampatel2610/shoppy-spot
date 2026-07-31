import React from 'react';
import { observer } from 'mobx-react-lite';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import cartStore from '../../stores/cartStore';
import AppConstants from '../../utils/AppConstants';

const OrderSummary = observer((props) => {
  const { onCheckout } = props;

  return (
    <aside className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4 sticky top-20">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {AppConstants.ORDER_SUMMARY_HEADER}
      </h2>

      {/* Coupon */}
      <div>
        <div className="flex gap-2">
          <InputText
            value={cartStore.couponInput}
            onChange={(e) => cartStore.setCouponInput(e.target.value)}
            placeholder={AppConstants.COUPON_PLACEHOLDER}
            className="flex-1 min-w-0 text-sm h-9"
            disabled={!!cartStore.appliedCoupon}
          />
          {cartStore.appliedCoupon ? (
            <Button
              label={AppConstants.REMOVE_COUPON_LABEL}
              onClick={cartStore.removeCoupon}
              outlined
              className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f] whitespace-nowrap"
            />
          ) : (
            <Button
              label={AppConstants.APPLY_COUPON_LABEL}
              onClick={cartStore.applyCoupon}
              className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
            />
          )}
        </div>
        {cartStore.couponError && (
          <p className="text-xs text-red-500 mt-1">{cartStore.couponError}</p>
        )}
        {cartStore.appliedCoupon && (
          <p className="text-xs text-green-600 mt-1">
            {`${AppConstants.COUPON_APPLIED_PREFIX} ${cartStore.appliedCoupon.label}`}
          </p>
        )}
      </div>

      {/* Totals */}
      <div className="space-y-1.5 text-sm border-t border-gray-100 pt-3">
        <div className="flex justify-between text-gray-600">
          <span>{AppConstants.SUBTOTAL_LABEL}</span>
          <span>${cartStore.subtotal.toFixed(2)}</span>
        </div>
        {cartStore.discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>{AppConstants.DISCOUNT_LABEL}</span>
            <span>-${cartStore.discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-900 font-bold text-base border-t border-gray-100 pt-2">
          <span>{AppConstants.TOTAL_LABEL}</span>
          <span>${cartStore.total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        label={AppConstants.CHECKOUT_LABEL}
        icon="pi pi-lock"
        onClick={onCheckout}
        className="w-full h-10 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </aside>
  )
})

export default OrderSummary;
