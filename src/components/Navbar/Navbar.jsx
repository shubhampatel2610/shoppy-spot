import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Badge } from 'primereact/badge';
import AppConstants from '../../utils/AppConstants';
import productStore from '../../stores/productStore';
import cartStore from '../../stores/cartStore';

const Navbar = observer(() => {
  const navigate = useNavigate();
  const search = productStore.searchQuery;

  const handleSearch = (e) => {
    const value = e.target.value;
    productStore.setSearchQuery(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = search.trim();

      if (trimmed) {
        productStore.searchProductsByQuery(trimmed);
      } else {
        productStore.loadAllProducts();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <header className="bg-[#1e3a5f] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-full mx-auto px-4 h-14 flex items-center gap-4">
        {/* Hamburger */}
        <button className="text-white hover:text-gray-300 transition">
          <i className="pi pi-bars text-xl" />
        </button>

        {/* Logo */}
        <span
          className="font-bold text-lg tracking-wide cursor-pointer select-none hidden sm:block whitespace-nowrap"
          onClick={() => navigate('/')}
        >
          {AppConstants.LOGO_TEXT}
        </span>

        {/* Search */}
        <div className="flex-1 flex justify-center">
          <IconField iconPosition="left" className="w-full max-w-xl">
            <InputIcon className="pi pi-search" />
            <InputText
              value={productStore.searchQuery}
              onChange={handleSearch}
              placeholder={AppConstants.SEARCH_BAR_PLACEHOLDER}
              className="w-full"
            />
          </IconField>
        </div>

        {/* Nav Icons */}
        <div className="flex items-center gap-4">
          <button className="relative hover:text-blue-300 transition" onClick={() => navigate('/cart')}>
            <i className="pi pi-shopping-cart text-xl" />
            {cartStore.totalItems > 0 && (
              <Badge value={cartStore.totalItems} severity="danger" className="absolute -top-2 -right-2" />
            )}
          </button>
          <button className="hover:text-blue-300 transition">
            <i className="pi pi-bell text-xl" />
          </button>
          <button className="hover:text-blue-300 transition">
            <i className="pi pi-user text-xl" />
          </button>
        </div>
      </div>
    </header>
  )
})

export default Navbar;
