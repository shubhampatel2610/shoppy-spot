import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import AppConstants from '../../utils/AppConstants';

const Navbar = observer(() => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
  }

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
              value={"Value"}
              onChange={handleSearch}
              placeholder={AppConstants.SEARCH_BAR_PLACEHOLDER}
              className="w-full"
            />
          </IconField>
        </div>

        {/* Nav Icons */}
        <div className="flex items-center gap-4">
          <button className="hover:text-blue-300 transition">
            <i className="pi pi-shopping-cart text-xl" />
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