import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';
import authStore from '../../stores/authStore';
import AppLogo from '../svg/AppLogo';
import AppConstants from '../../utils/AppConstants';

const NAV_ITEMS = [
  { to: '/vendor/dashboard', icon: 'pi-chart-line', label: 'Dashboard' },
  { to: '/vendor/products', icon: 'pi-box', label: 'Products' },
  { to: '/vendor/orders', icon: 'pi-shopping-bag', label: 'Orders' },
  { to: '/vendor/reviews', icon: 'pi-star', label: 'Reviews' },
  { to: '/vendor/settings', icon: 'pi-cog', label: 'Settings' },
];

// Sidebar shell for the vendor portal, rendered instead of the customer Navbar
// on every /vendor/* route (see App.jsx). Below md it becomes an off-canvas
// drawer behind a hamburger button; at md and up it's the original always-visible
// sidebar (every desktop-affecting class here is md:-prefixed to match exactly
// what was there before).
const VendorLayout = observer((props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeNav = () => setIsNavOpen(false);

  const handleLogout = () => {
    authStore.logout();
    navigate('/login');
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-100 overflow-hidden">
      {/* Mobile-only top bar - collapses to nothing at md via md:hidden */}
      <div className="md:hidden shrink-0 flex items-center gap-2 h-14 px-4 bg-[#1e3a5f] text-white">
        <button
          onClick={() => setIsNavOpen(true)}
          aria-label="Open menu"
          className="text-white -ml-1 p-1.5 cursor-pointer"
        >
          <i className="pi pi-bars text-xl" />
        </button>
        <AppLogo size={24} />
        <span className="font-bold tracking-wide">{AppConstants.LOGO_TEXT}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wide bg-white/10 rounded-full px-2 py-0.5 ml-auto">
          Vendor
        </span>
      </div>

      {/* Backdrop behind the mobile drawer */}
      {isNavOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeNav}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-60 shrink-0 h-full bg-[#1e3a5f] text-white flex flex-col overflow-y-auto transform transition-transform duration-200 ease-in-out md:translate-x-0 ${isNavOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div
          className="flex items-center gap-2 px-5 h-14 cursor-pointer select-none border-b border-white/10 shrink-0"
          onClick={() => { navigate('/vendor/dashboard'); closeNav(); }}
        >
          <AppLogo size={26} />
          <span className="font-bold tracking-wide">{AppConstants.LOGO_TEXT}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wide bg-white/10 rounded-full px-2 py-0.5 ml-auto">
            Vendor
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); closeNav(); }}
            aria-label="Close menu"
            className="md:hidden text-white/80 hover:text-white cursor-pointer"
          >
            <i className="pi pi-times" />
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeNav}
              className={({ isActive }) =>
                `flex items-center gap-3 text-sm rounded-lg px-3 py-2.5 transition ${isActive ? 'bg-white/15 font-semibold' : 'text-blue-100/80 hover:bg-white/10'
                }`
              }
            >
              <i className={`pi ${item.icon}`} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-2">
          <div className="px-2">
            <p className="text-sm font-semibold truncate">{authStore.currentUser?.name}</p>
            <p className="text-xs text-blue-100/60 truncate">{authStore.currentUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-sm text-red-200 hover:bg-red-500/10 rounded-lg px-3 py-2 transition cursor-pointer"
          >
            <i className="pi pi-sign-out" /> {AppConstants.LOGOUT_LABEL}
          </button>
        </div>
      </aside>

      {/* Each page owns its own scroll region (see PageShell) so a sticky
          header + filters row can stay put while only the listing below it scrolls. */}
      <main className="flex-1 min-w-0 min-h-0 overflow-hidden p-4 md:h-full md:p-6">{children}</main>
    </div>
  )
})

export default VendorLayout;
