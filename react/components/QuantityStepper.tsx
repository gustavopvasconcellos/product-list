import React, { FunctionComponent, useState } from 'react'
import { NumericStepper } from 'vtex.styleguide'

interface Props {
  id: string
  value: number
  maxValue: number
  onChange: (value: number) => void
  disabled: boolean
}

const QuantityStepper: FunctionComponent<Props> = ({
  id,
  value,
  maxValue,
  onChange,
  disabled,
}) => {
  const [currentValue, setCurrentValue] = useState(value)

  const handleChange = (value: string) => {
    setCurrentValue(value ? parseInt(value, 10) : 1)
    onChange(currentValue)
  }

  return (
    <NumericStepper
      id={`quantity-stepper-${id}`}
      value={currentValue}
      label={''}
      minValue={1}
      maxValue={maxValue}
      disabled={disabled}
      onChange={(event: any) => handleChange(event.value)}
    ></NumericStepper>
  )
}

export default QuantityStepper
