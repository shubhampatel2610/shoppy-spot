import React from 'react';
import AppLogo from '../../../public/AppLogo';
import AppConstants from '../../utils/AppConstants';

// Shared split-panel shell for the Login/Signup pages - a branding panel on the left
// (hidden on small screens) and a centered form card on the right.
const AuthLayout = (props) => {
  const { title, subtitle, titleExtra, children, footer } = props;

  return (
    <main className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#1e3a5f] relative overflow-hidden flex-col justify-between p-10 text-white">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
        <div className="absolute bottom-10 -left-16 w-56 h-56 rounded-full bg-white/5" />

        <div className="relative flex items-center gap-2">
          <AppLogo size={32} />
          <span className="font-bold text-xl tracking-wide">{AppConstants.LOGO_TEXT}</span>
        </div>

        <div className="relative space-y-3 max-w-sm">
          <h2 className="text-3xl font-bold leading-tight">{AppConstants.AUTH_BRAND_HEADLINE}</h2>
          <p className="text-sm text-blue-100/80">{AppConstants.AUTH_BRAND_SUBTEXT}</p>
        </div>

        <p className="relative text-xs text-blue-100/60">
          {`© ${new Date().getFullYear()} ${AppConstants.LOGO_TEXT}. All rights reserved.`}
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-6">
            <AppLogo size={28} />
            <span className="font-bold text-lg tracking-wide text-[#1e3a5f]">{AppConstants.LOGO_TEXT}</span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-2">
              <div>
                <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
              </div>
              {titleExtra}
            </div>

            {children}
          </div>

          {footer && <div className="mt-5 text-center">{footer}</div>}
        </div>
      </div>
    </main>
  )
}

export default AuthLayout;
