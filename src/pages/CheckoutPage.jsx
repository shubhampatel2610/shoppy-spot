import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import cartStore from '../stores/cartStore';
import AppConstants from '../utils/AppConstants';
import CartItemRow from '../components/Cart/CartItemRow';
import OrderSummary from '../components/Cart/OrderSummary';

const CheckoutPage = observer(() => {
  const navigate = useNavigate();
  const toastRef = useRef(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    toastRef.current?.show({
      severity: 'success',
      summary: AppConstants.ORDER_PLACED_TITLE,
      detail: AppConstants.ORDER_PLACED_MESSAGE,
      life: 3000,
    });
    cartStore.clearCart();
    setIsOrderPlaced(true);
  }

  if (isOrderPlaced) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <Toast ref={toastRef} />
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <i className="pi pi-check-circle text-5xl text-green-500" />
          <h1 className="text-lg font-bold text-gray-800">{AppConstants.ORDER_PLACED_TITLE}</h1>
          <p className="text-sm text-gray-400">{AppConstants.ORDER_PLACED_MESSAGE}</p>
          <Button
            label={AppConstants.CONTINUE_SHOPPING_LABEL}
            icon="pi pi-arrow-left"
            onClick={() => navigate('/')}
            className="mt-2 h-9 text-sm bg-[#1e3a5f] border-0 text-white"
          />
        </div>
      </main>
    )
  }

  if (cartStore.isEmpty) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <Toast ref={toastRef} />
      <h1 className="text-lg font-bold text-gray-800 mb-1">{AppConstants.CHECKOUT_PAGE_TITLE}</h1>
      <p className="text-xs text-gray-400 mb-4">
        {`${cartStore.totalItems} ${AppConstants.ITEMS_IN_CART_SUFFIX}`}
      </p>

      <div className="flex flex-col md:flex-row gap-5 items-start">
        <div className="flex-1 min-w-0 w-full space-y-3">
          {cartStore.items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        <div className="w-full md:w-72 shrink-0">
          <OrderSummary onCheckout={handlePlaceOrder} buttonLabel={AppConstants.PLACE_ORDER_LABEL} />
        </div>
      </div>
    </main>
  )
})

export default CheckoutPage;
