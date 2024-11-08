/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, Control, FieldValues } from 'react-hook-form'
import styled from 'styled-components'

const StyledSelect = styled.select<{ $width?: string; $marginRight?: string }>`
  width: ${(props) => props.$width || '100%'};
  height: 30px;
  background-color: transparent;
  border: 1px solid #222222;
  border-radius: 5px;
  padding: 5px;
  font-size: 13px;
  color: black;
  margin-right: ${(props) => props.$marginRight || '0px'};
  outline: none;
`

interface DropdownProps {
  name: string
  control: Control<FieldValues>
  defaultValue?: any
  width?: string
  marginRight?: string
  options: { label: string; value: any }[]
  placeholder?: string
  id: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Dropdown({
  name,
  control,
  defaultValue = '',
  width,
  marginRight,
  options,
  placeholder,
  id,
  onChange,
}: DropdownProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <StyledSelect
          {...field}
          $width={width}
          $marginRight={marginRight}
          id={id}
          onChange={(e) => {
            field.onChange(e) // update react-hook-form state
            if (onChange) {
              onChange(e)
            }
          }}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      )}
    />
  )
}
