import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import cartStore from '../stores/cartStore';
import AppConstants from '../utils/AppConstants';
import CartItemRow from '../components/Cart/CartItemRow';
import OrderSummary from '../components/Cart/OrderSummary';

const CartPage = observer(() => {
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  }

  if (cartStore.isEmpty) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <i className="pi pi-shopping-cart text-5xl text-gray-300" />
          <h1 className="text-lg font-bold text-gray-800">{AppConstants.CART_EMPTY_TITLE}</h1>
          <p className="text-sm text-gray-400">{AppConstants.CART_EMPTY_SUBTEXT}</p>
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

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-lg font-bold text-gray-800 mb-1">{AppConstants.CART_PAGE_TITLE}</h1>
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
          <OrderSummary onCheckout={handleProceedToCheckout} />
        </div>
      </div>
    </main>
  )
})

export default CartPage;
