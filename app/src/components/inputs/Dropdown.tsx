/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, Control, FieldValues } from 'react-hook-form'
import styled from 'styled-components'

const StyledSelect = styled.select<{
  $width?: string
  $marginRight?: string
  $disabled?: boolean
}>`
  width: ${(props) => props.$width || '100%'};
  height: 30px;
  background-color: ${(props) => (props.$disabled ? '#f0f0f0' : 'transparent')};
  border: 1px solid ${(props) => (props.$disabled ? '#ccc' : '#222222')};
  border-radius: 5px;
  padding: 5px;
  font-size: 13px;
  color: ${(props) => (props.$disabled ? '#999' : 'black')};
  margin-right: ${(props) => props.$marginRight || '0px'};
  outline: none;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'text')};

  option {
    color: ${(props) => (props.$disabled ? '#ccc' : 'black')};
  }
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
  $disabled?: boolean // Nova propriedade disabled
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
  $disabled, // Valor padrão do disabled
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
          $disabled={$disabled} // Passando a propriedade disabled para o styled component
          onChange={(e) => {
            field.onChange(e) // update react-hook-form state
            if (onChange) {
              onChange(e)
            }
          }}
          disabled={$disabled} // Aqui o atributo 'disabled' está sendo aplicado ao select
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
