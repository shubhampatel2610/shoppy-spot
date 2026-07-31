import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

const QuantityStepper = (props) => {
  const { value, onChange, min = 1, max } = props;

  return (
    <InputNumber
      value={value}
      onValueChange={(e) => onChange(e.value ?? min)}
      showButtons
      buttonLayout="horizontal"
      min={min}
      max={max}
      decrementButtonClassName="p-button-outlined"
      incrementButtonClassName="p-button-outlined"
      inputClassName="w-10 text-center"
      className="quantity-stepper"
    />
  )
}

export default QuantityStepper;
