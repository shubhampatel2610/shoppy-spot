import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../stores/userStore';
import AppConstants from '../utils/AppConstants';
import ProfileImage from '../components/common/ProfileImage';
import InfoRow from '../components/UserDetails/InfoRow';
import EditProfileDialog from '../components/UserDetails/EditProfileDialog';
import EditAddressDialog from '../components/UserDetails/EditAddressDialog';
import UserDetailsSkeleton from '../components/common/UserDetailsSkeleton';

const UserDetailsPage = observer(() => {
  useEffect(() => {
    userStore.loadUser();
  }, []);

  const { profile, address } = userStore;
  const fullName = [profile.firstName, profile.middleName, profile.lastName].filter(Boolean).join(' ');
  const genderLabel = AppConstants.GENDER_OPTIONS.find((option) => option.value === profile.gender)?.label;

  if (userStore.isLoading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-lg font-bold text-gray-800 mb-4">{AppConstants.USER_DETAILS_TITLE}</h1>
        <UserDetailsSkeleton />
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-lg font-bold text-gray-800 mb-4">{AppConstants.USER_DETAILS_TITLE}</h1>

      {/* Personal Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <ProfileImage gender={profile.gender} size={72} />
            <div>
              <p className="text-base font-bold text-gray-800">{fullName || AppConstants.NOT_PROVIDED_TEXT}</p>
              <p className="text-xs text-gray-400">{profile.email}</p>
            </div>
          </div>
          <button onClick={userStore.openProfileDialog} className="text-gray-400 hover:text-[#1e3a5f] transition">
            <i className="pi pi-pencil text-lg" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
          <InfoRow label={AppConstants.FIRST_NAME_FIELD.label} value={profile.firstName} />
          <InfoRow label={AppConstants.MIDDLE_NAME_FIELD.label} value={profile.middleName} />
          <InfoRow label={AppConstants.LAST_NAME_FIELD.label} value={profile.lastName} />
          <InfoRow label={AppConstants.PHONE_FIELD.label} value={profile.phone} />
          <InfoRow label={AppConstants.EMAIL_FIELD.label} value={profile.email} />
          <InfoRow label={AppConstants.GENDER_FIELD.label} value={genderLabel} />
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {AppConstants.ADDRESS_HEADER}
          </h2>
          <button onClick={userStore.openAddressDialog} className="text-gray-400 hover:text-[#1e3a5f] transition">
            <i className="pi pi-pencil text-lg" />
          </button>
        </div>

        {userStore.hasAddress ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow label={AppConstants.BUILDING_NO_FIELD.label} value={address.buildingNo} />
            <InfoRow label={AppConstants.STREET_NAME_FIELD.label} value={address.streetName} />
            <InfoRow label={AppConstants.LANDMARK_FIELD.label} value={address.landmark} />
            <InfoRow label={AppConstants.CITY_FIELD.label} value={address.city} />
            <InfoRow label={AppConstants.PINCODE_FIELD.label} value={address.pincode} />
            <InfoRow label={AppConstants.STATE_FIELD.label} value={address.state} />
            <InfoRow label={AppConstants.COUNTRY_FIELD.label} value={address.country} />
          </div>
        ) : (
          <p className="text-sm text-gray-400">{AppConstants.NO_ADDRESS_TEXT}</p>
        )}
      </div>

      <EditProfileDialog />
      <EditAddressDialog />
    </main>
  )
})

export default UserDetailsPage;
