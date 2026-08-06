import { makeAutoObservable } from 'mobx';

// Store for shared, app-wide UI components that need to be triggered from anywhere -
// currently just the confirm dialog. Same "mount once at the root, trigger from any
// store/handler" pattern authStore uses for the login prompt (see
// authStore.requireLogin/isLoginPromptVisible) - this generalizes it to any
// yes/no confirmation instead of one hardcoded to a single message.
class ComponentStore {
  // Confirm Dialog initial state
  isConfirmDialogVisible = false;
  confirmDialogHeader = '';
  confirmDialogMessage = '';
  onConfirm = null;
  onClose = null;
  // false for a plain acknowledge-only notice (single "OK" button) - e.g. blocking
  // a delete because the item is still in use. true (default) for a real yes/no choice.
  showCancel = true;

  constructor() {
    makeAutoObservable(this);
  }

  // Setter - fills in the dialog's header/message/callbacks without touching visibility.
  setConfirmDialogData = ({ header = '', message = '', onConfirm = null, onClose = null, showCancel = true }) => {
    this.confirmDialogHeader = header;
    this.confirmDialogMessage = message;
    this.onConfirm = onConfirm;
    this.onClose = onClose;
    this.showCancel = showCancel;
  }

  // Toggle - flips (or explicitly sets, if a value is passed) visibility only.
  toggleConfirmDialog = (value) => {
    this.isConfirmDialogVisible = value ?? !this.isConfirmDialogVisible;
  }

  // What every call site actually calls: componentStore.openConfirmDialog({ header,
  // message, onConfirm, onClose, showCancel }) from anywhere - a click handler, a
  // store method - instead of window.confirm/window.alert. onClose is optional, for
  // callers that need to react to a cancel (most don't - a cancelled confirm is just
  // a no-op). Pass showCancel: false for a plain notice instead of a yes/no choice.
  openConfirmDialog = ({ header, message, onConfirm, onClose, showCancel }) => {
    this.setConfirmDialogData({ header, message, onConfirm, onClose, showCancel });
    this.toggleConfirmDialog(true);
  }

  // YES - reset first, then run the caller's action. Resetting first (rather than
  // after) lets the callback itself open a follow-up dialog - e.g. a delete whose
  // "backend" rejects it chains straight into an error notice - without that reset
  // wiping out the new dialog it just opened.
  handleConfirm = () => {
    const onConfirm = this.onConfirm;
    this.closeConfirmDialog();
    onConfirm?.();
  }

  // NO (or the dialog is dismissed/clicked outside) - revert without acting: reset
  // first, then run the caller's onClose if they gave one (same reset-before-callback
  // order as handleConfirm, for the same reason).
  handleClose = () => {
    const onClose = this.onClose;
    this.closeConfirmDialog();
    onClose?.();
  }

  closeConfirmDialog = () => {
    this.toggleConfirmDialog(false);
    this.setConfirmDialogData({});
  }
}

const componentStore = new ComponentStore();

export default componentStore;
