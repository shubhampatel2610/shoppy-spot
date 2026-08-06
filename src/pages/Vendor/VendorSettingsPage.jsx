import React from 'react';
import { observer } from 'mobx-react-lite';
import vendorProfileStore from '../../stores/vendorProfileStore';
import vendorPersonalStore from '../../stores/vendorPersonalStore';
import PageShell from '../../components/common/PageShell';
import EditVendorProfileDialog from '../../components/Vendor/EditVendorProfileDialog';
import EditVendorPersonalDialog from '../../components/Vendor/EditVendorPersonalDialog';
import InfoRow from '../../components/UserDetails/InfoRow';

// Read-only view (still backed by raw dummy data for now) with Edit buttons opening
// their respective dialogs - same view/edit split as the customer UserDetailsPage,
// split into a personal-details card and a store-profile card.
const VendorSettingsPage = observer(() => {
  const { profile: storeProfile } = vendorProfileStore;
  const { profile: personalProfile } = vendorPersonalStore;

  const header = (
    <div className="mb-5">
      <h1 className="text-lg font-bold text-gray-800">Profile</h1>
      <p className="text-xs text-gray-400">Manage your personal and store details</p>
    </div>
  );

  return (
    <PageShell header={header}>
      {/* Personal Details */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-3">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center shrink-0 font-bold text-xl">
              {personalProfile.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-gray-800 truncate">{personalProfile.name}</p>
              <p className="text-xs text-gray-400 truncate">{personalProfile.email}</p>
            </div>
          </div>
          <button onClick={vendorPersonalStore.openEditDialog} className="text-gray-400 hover:text-[#1e3a5f] transition shrink-0">
            <i className="pi pi-pencil text-lg" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
          <InfoRow label="Full Name" value={personalProfile.name} />
          <InfoRow label="Phone No" value={personalProfile.phone} />
          <InfoRow label="Email" value={personalProfile.email} />
        </div>
      </div>

      {/* Store Profile */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 min-w-0">
            {storeProfile.logoUrl ? (
              <img
                src={storeProfile.logoUrl}
                alt={storeProfile.storeName}
                className="h-16 w-16 rounded-full object-cover border border-gray-100 shrink-0"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center shrink-0">
                <i className="pi pi-shop text-2xl" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-base font-bold text-gray-800 truncate">{storeProfile.storeName}</p>
              <p className="text-xs text-gray-400 truncate">{storeProfile.storeDescription || 'No description added yet'}</p>
            </div>
          </div>
          <button onClick={vendorProfileStore.openEditDialog} className="text-gray-400 hover:text-[#1e3a5f] transition shrink-0">
            <i className="pi pi-pencil text-lg" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
          <InfoRow label="Store Name" value={storeProfile.storeName} />
          <InfoRow label="Phone No" value={storeProfile.phone} />
          <InfoRow label="Business Address" value={storeProfile.businessAddress} />
          <InfoRow label="Logo URL" value={storeProfile.logoUrl} />
        </div>
      </div>

      <EditVendorPersonalDialog />
      <EditVendorProfileDialog />
    </PageShell>
  )
})

export default VendorSettingsPage;
