import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import adminCategoryStore from '../../stores/adminCategoryStore';
import AppConstants from '../../utils/AppConstants';
import FormInputField from '../common/FormInputField';

const CategoryFormDialog = observer(() => {
  const isEditMode = Boolean(adminCategoryStore.editingCategoryId);

  const footer = (
    <div className="flex justify-end gap-2">
      <Button
        label={AppConstants.CANCEL_LABEL}
        outlined
        onClick={adminCategoryStore.closeForm}
        className="h-9 text-sm text-[#1e3a5f] border-[#1e3a5f]"
      />
      <Button
        label={isEditMode ? 'Save Changes' : 'Add Category'}
        onClick={adminCategoryStore.saveCategory}
        className="h-9 text-sm bg-[#1e3a5f] border-0 text-white"
      />
    </div>
  );

  return (
    <Dialog
      header={isEditMode ? 'Edit Category' : 'Add Category'}
      visible={adminCategoryStore.isFormOpen}
      onHide={adminCategoryStore.closeForm}
      footer={footer}
      className="w-full max-w-sm mx-4"
      blockScroll
    >
      <div className="pt-2">
        <FormInputField field={adminCategoryStore.nameField} />
      </div>
    </Dialog>
  )
})

export default CategoryFormDialog;
