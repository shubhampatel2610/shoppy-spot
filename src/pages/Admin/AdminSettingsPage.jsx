import React from 'react';
import { observer } from 'mobx-react-lite';
import adminPersonalStore from '../../stores/adminPersonalStore';
import PageShell from '../../components/common/PageShell';
import EditAdminProfileDialog from '../../components/Admin/EditAdminProfileDialog';
import InfoRow from '../../components/UserDetails/InfoRow';

// Just the personal-details card from VendorSettingsPage - admin has no store
// profile since it doesn't run a store.
const AdminSettingsPage = observer(() => {
  const { profile } = adminPersonalStore;

  const header = (
    <div className="mb-5">
      <h1 className="text-lg font-bold text-gray-800">Profile</h1>
      <p className="text-xs text-gray-400">Manage your personal details</p>
    </div>
  );

  return (
    <PageShell header={header}>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-16 w-16 rounded-full bg-[#1e3a5f]/10 text-[#1e3a5f] flex items-center justify-center shrink-0 font-bold text-xl">
              {profile.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-base font-bold text-gray-800 truncate">{profile.name}</p>
              <p className="text-xs text-gray-400 truncate">{profile.email}</p>
            </div>
          </div>
          <button onClick={adminPersonalStore.openEditDialog} className="text-gray-400 hover:text-[#1e3a5f] transition shrink-0">
            <i className="pi pi-pencil text-lg" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
          <InfoRow label="Full Name" value={profile.name} />
          <InfoRow label="Phone No" value={profile.phone} />
          <InfoRow label="Email" value={profile.email} />
        </div>
      </div>

      <EditAdminProfileDialog />
    </PageShell>
  )
})

export default AdminSettingsPage;
