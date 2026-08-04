import React from 'react';
import { observer } from 'mobx-react-lite';
import { Password } from 'primereact/password';

// Reusable label + masked password input (with show/hide toggle) + error block bound to a single Field instance
const FormPasswordField = observer((props) => {
  const { field } = props;

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {field.label}
      </label>
      <Password
        value={field.value}
        placeholder={field.placeholder}
        onChange={(e) => field.setValue(e.target.value)}
        onBlur={() => field.validate()}
        toggleMask
        feedback={false}
        className="w-full"
        inputClassName="w-full text-sm"
      />
      {field.error && (
        <p className="text-xs text-red-500 mt-1">{field.error}</p>
      )}
    </div>
  )
})

export default FormPasswordField;
