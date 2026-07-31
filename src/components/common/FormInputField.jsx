import React from 'react';
import { observer } from 'mobx-react-lite';
import { InputText } from 'primereact/inputtext';

// Reusable label + text input + error block bound to a single Field instance
const FormInputField = observer((props) => {
  const { field, keyfilter } = props;

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {field.label}
      </label>
      <InputText
        value={field.value}
        placeholder={field.placeholder}
        keyfilter={keyfilter}
        onChange={(e) => field.setValue(e.target.value)}
        onBlur={() => field.validate()}
        className="w-full text-sm"
      />
      {field.error && (
        <p className="text-xs text-red-500 mt-1">{field.error}</p>
      )}
    </div>
  )
})

export default FormInputField;
