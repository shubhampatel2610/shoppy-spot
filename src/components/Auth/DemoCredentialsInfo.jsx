import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import AppConstants from '../../utils/AppConstants';

// Delay before hiding on mouse-leave, so moving from the icon to the panel doesn't flicker-close it.
const HIDE_DELAY_MS = 150;

// Hover-to-preview / click-to-autofill demo credentials, shown next to the login form heading.
const DemoCredentialsInfo = (props) => {
  const { onSelect } = props;
  const panelRef = useRef(null);
  const hideTimerRef = useRef(null);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }

  const show = (e) => {
    clearHideTimer();
    panelRef.current?.show(e);
  }

  const scheduleHide = () => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => panelRef.current?.hide(), HIDE_DELAY_MS);
  }

  const handleSelect = (account) => {
    clearHideTimer();
    onSelect?.(account);
    panelRef.current?.hide();
  }

  return (
    <>
      <button
        type="button"
        className="text-gray-400 hover:text-[#1e3a5f] transition cursor-pointer shrink-0"
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        onFocus={show}
        onBlur={scheduleHide}
        aria-label={AppConstants.DEMO_CREDENTIALS_TOOLTIP_HEADER}
      >
        <i className="pi pi-info-circle text-lg" />
      </button>

      <OverlayPanel
        ref={panelRef}
        showCloseIcon={false}
        className="w-80"
        onMouseEnter={clearHideTimer}
        onMouseLeave={scheduleHide}
      >
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          {AppConstants.DEMO_CREDENTIALS_TOOLTIP_HEADER}
        </h3>
        <div className="space-y-2">
          {AppConstants.DEMO_ACCOUNTS.map((account) => (
            <button
              type="button"
              key={account.role}
              onClick={() => handleSelect(account)}
              className="w-full text-left flex items-center justify-between gap-2 border border-dashed border-gray-200 rounded-lg px-3 py-2 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 transition cursor-pointer"
            >
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#1e3a5f]">{account.role}</p>
                <p className="text-xs text-gray-500 truncate">{account.email}</p>
                <p className="text-xs text-gray-400 font-mono">{account.password}</p>
              </div>
              <i className="pi pi-arrow-right text-xs text-gray-300 shrink-0" />
            </button>
          ))}
        </div>
        <p className="text-[11px] text-gray-400 mt-3">{AppConstants.DEMO_CREDENTIALS_HINT_TEXT}</p>
      </OverlayPanel>
    </>
  )
}

export default DemoCredentialsInfo;
