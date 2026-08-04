import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Badge } from 'primereact/badge';
import { OverlayPanel } from 'primereact/overlaypanel';
import AppConstants from '../../utils/AppConstants';
import productStore from '../../stores/productStore';
import cartStore from '../../stores/cartStore';
import authStore from '../../stores/authStore';
import AppLogo from '../../../public/AppLogo';

const Navbar = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const search = productStore.searchQuery;
  const userMenuRef = useRef(null);

  const handleUserIconClick = (e) => {
    userMenuRef.current?.toggle(e);
  }

  const handleProfileClick = () => {
    userMenuRef.current?.hide();
    navigate('/user');
  }

  const handleLogout = () => {
    userMenuRef.current?.hide();
    authStore.logout();
    navigate('/');
  }

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
        <button className="group text-white hover:text-gray-300 transition cursor-pointer">
          <i className="pi pi-bars text-xl transition-transform group-hover:scale-125" />
        </button>

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none shrink-0"
          onClick={() => navigate('/')}
        >
          <AppLogo size={28} />
          <span className="font-bold text-lg tracking-wide hidden sm:block whitespace-nowrap">
            {AppConstants.LOGO_TEXT}
          </span>
        </div>

        {/* Search - home page only */}
        {isHomePage ? (
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
        ) : (
          <div className="flex-1" />
        )}

        {/* Nav Icons */}
        <div className="flex items-center gap-4">
          <button className="group relative hover:text-blue-300 transition cursor-pointer" onClick={() => navigate('/cart')}>
            <i className="pi pi-shopping-cart text-xl transition-transform group-hover:scale-125" />
            {cartStore.totalItems > 0 && (
              <Badge value={cartStore.totalItems} severity="danger" className="absolute -top-2 -right-2" />
            )}
          </button>
          {authStore.isAuthenticated ? (
            <button className="group relative hover:text-blue-300 transition cursor-pointer" onClick={handleUserIconClick}>
              <i className="pi pi-user text-xl transition-transform group-hover:scale-125" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 border border-[#1e3a5f]" />
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 text-sm font-medium border border-white/40 rounded-full px-3.5 py-1.5 hover:bg-white/10 hover:border-white transition cursor-pointer"
            >
              <i className="pi pi-user text-sm" />
              {AppConstants.SIGN_IN_LABEL}
            </button>
          )}
        </div>
      </div>

      {authStore.isAuthenticated && (
        <OverlayPanel ref={userMenuRef} className="w-64">
          <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center font-bold shrink-0">
              {authStore.currentUser?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-800 truncate">{authStore.currentUser?.name}</p>
              <p className="text-xs text-gray-400 truncate">{authStore.currentUser?.email}</p>
              <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wide text-[#1e3a5f] bg-[#1e3a5f]/10 rounded-full px-2 py-0.5">
                {authStore.currentUser?.role}
              </span>
            </div>
          </div>
          <div className="pt-2 space-y-0.5">
            <button
              onClick={handleProfileClick}
              className="w-full text-left flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1e3a5f] rounded-lg px-2.5 py-2 transition cursor-pointer"
            >
              <i className="pi pi-user" /> {AppConstants.MY_PROFILE_LABEL}
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center gap-2 text-sm text-red-500 hover:bg-red-50 rounded-lg px-2.5 py-2 transition cursor-pointer"
            >
              <i className="pi pi-sign-out" /> {AppConstants.LOGOUT_LABEL}
            </button>
          </div>
        </OverlayPanel>
      )}
    </header>
  )
})

export default Navbar;
