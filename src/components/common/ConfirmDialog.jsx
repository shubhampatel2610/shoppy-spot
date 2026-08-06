import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import componentStore from '../../stores/componentStore';

// Global Yes/No confirmation popup, driven entirely by componentStore - mounted once
// at the app root (see App.jsx), same as LoginRequiredDialog. Trigger it from
// anywhere with:
//   componentStore.openConfirmDialog({ header, message, onConfirm, onClose })
// instead of window.confirm, so every state-changing action (delete, activate,
// suspend, archive, ...) across the app gets the same styled confirmation. YES runs
// onConfirm and closes; NO (or closing the dialog) reverts - runs onClose if given,
// otherwise just closes without acting.
//
// Pass showCancel: false to use it as a plain acknowledge-only notice instead (e.g.
// blocking a delete because the item is still in use) - only a single "OK" button
// shows, which just closes without needing an onConfirm.
const ConfirmDialog = observer(() => {
  const footer = (
    <div className="flex justify-end gap-2">
      {componentStore.showCancel && (
        <Button
          label="No"
          outlined
          onClick={componentStore.handleClose}
          className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
        />
      )}
      <Button
        label={componentStore.showCancel ? 'Yes' : 'OK'}
        onClick={componentStore.handleConfirm}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header={componentStore.confirmDialogHeader}
      visible={componentStore.isConfirmDialogVisible}
      onHide={componentStore.handleClose}
      footer={footer}
      className="w-full max-w-sm mx-4"
      blockScroll
    >
      <div className="flex items-start gap-3 pt-1">
        <i className="pi pi-question-circle text-2xl text-[#1e3a5f]" />
        <p className="text-sm text-gray-600">{componentStore.confirmDialogMessage}</p>
      </div>
    </Dialog>
  )
})

export default ConfirmDialog;
