import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import cartStore from '../../stores/cartStore';
import AppConstants from '../../utils/AppConstants';

const OrderSummary = observer((props) => {
  const { onCheckout } = props;
  const couponListRef = useRef(null);

  const handleSelectCoupon = (code) => {
    cartStore.selectCoupon(code);
    couponListRef.current?.hide();
  }

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
            className="flex-1 min-w-0 text-sm h-9 uppercase"
            keyfilter="alphanum"
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

        {!cartStore.appliedCoupon && (
          <button
            onClick={(e) => couponListRef.current?.toggle(e)}
            className="text-xs text-[#1e3a5f] hover:underline mt-1.5 flex items-center gap-1"
          >
            <i className="pi pi-tags" /> {AppConstants.VIEW_COUPONS_LABEL}
          </button>
        )}

        <OverlayPanel ref={couponListRef} className="w-72">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {AppConstants.AVAILABLE_COUPONS_HEADER}
          </h3>
          <div className="space-y-2">
            {AppConstants.AVAILABLE_COUPONS.map((coupon) => {
              const eligible = cartStore.isCouponEligible(coupon);
              const tooltip = eligible
                ? null
                : `${AppConstants.COUPON_MIN_ORDER_PREFIX} $${cartStore.amountNeededFor(coupon).toFixed(2)} ${AppConstants.COUPON_MIN_ORDER_SUFFIX}`;

              return (
                <div
                  key={coupon.code}
                  className="flex items-center justify-between gap-2 border border-dashed border-gray-200 rounded-lg px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-bold text-[#1e3a5f] tracking-wide">{coupon.code}</p>
                    <p className="text-xs text-gray-500">{coupon.label}</p>
                  </div>
                  <Button
                    label={AppConstants.APPLY_COUPON_LABEL}
                    onClick={() => handleSelectCoupon(coupon.code)}
                    outlined
                    disabled={!eligible}
                    tooltip={tooltip}
                    tooltipOptions={{ position: 'top', showOnDisabled: true }}
                    className="h-8 text-xs text-[#1e3a5f] border-[#1e3a5f] whitespace-nowrap"
                  />
                </div>
              )
            })}
          </div>
        </OverlayPanel>

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
