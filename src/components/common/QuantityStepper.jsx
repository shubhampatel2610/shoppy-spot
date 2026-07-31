import React from 'react';
import { InputNumber } from 'primereact/inputnumber';

const QuantityStepper = (props) => {
  const { value, onChange, min = 1, max } = props;

  // PrimeReact's InputNumber clamps the value at min/max but doesn't disable
  // the buttons on its own, so the disabled state is driven here instead.
  const atMax = max !== undefined && value >= max;
  const atMin = value <= min;

  return (
    <InputNumber
      value={value}
      onValueChange={(e) => onChange(e.value ?? min)}
      showButtons
      buttonLayout="horizontal"
      incrementButtonIcon="pi pi-plus"
      decrementButtonIcon="pi pi-minus"
      min={min}
      max={max}
      decrementButtonClassName="p-button-outlined"
      incrementButtonClassName="p-button-outlined"
      inputClassName="w-10 text-center"
      className={`quantity-stepper${atMax ? ' at-max' : ''}${atMin ? ' at-min' : ''}`}
    />
  )
}

export default QuantityStepper;
