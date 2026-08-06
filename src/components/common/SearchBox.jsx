import React from 'react';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

// Reusable search field (icon + text input) - same visual pattern as the customer
// Navbar's product search, reused here for the vendor/admin search bars.
const SearchBox = (props) => {
  const { value, onChange, placeholder = 'Search...', className = '' } = props;

  return (
    <IconField iconPosition="left" className={className}>
      <InputIcon className="pi pi-search" />
      <InputText
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm h-9"
      />
    </IconField>
  )
}

export default SearchBox;
