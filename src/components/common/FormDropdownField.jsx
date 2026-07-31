import React from 'react';
import { observer } from 'mobx-react-lite';
import { Dropdown } from 'primereact/dropdown';

// Reusable label + dropdown + error block bound to a single Field instance
const FormDropdownField = observer((props) => {
  const { field, options } = props;

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {field.label}
      </label>
      <Dropdown
        value={field.value}
        options={options}
        placeholder={field.placeholder}
        onChange={(e) => field.setValue(e.value)}
        onHide={() => field.validate()}
        className="w-full text-sm"
      />
      {field.error && (
        <p className="text-xs text-red-500 mt-1">{field.error}</p>
      )}
    </div>
  )
})

export default FormDropdownField;
