/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, Control, FieldValues } from 'react-hook-form'
import styled from 'styled-components'

const StyledInput = styled.input<{
  $width?: string
  $marginRight?: string
  $disabled?: boolean
}>`
  width: ${(props) => props.$width || '100%'};
  height: 30px;
  background-color: ${(props) => (props.$disabled ? '#f0f0f0' : 'transparent')};
  border: 1px solid ${(props) => (props.$disabled ? '#ccc' : '#222222')};
  border-radius: 5px;
  padding: 10px;
  font-size: 13px;
  color: ${(props) => (props.$disabled ? '#999' : 'black')};
  margin-right: ${(props) => props.$marginRight || '0px'};
  outline: none;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'text')};

  &::placeholder {
    color: ${(props) => (props.$disabled ? '#ccc' : '#999')};
  }
`

interface InputProps {
  name: string
  control: Control<FieldValues>
  defaultValue?: any
  width?: string
  marginRight?: string
  placeholder?: string
  type: string
  id: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isCurrency?: boolean
  disabled?: boolean 
}

export default function Input({
  name,
  control,
  defaultValue = '',
  width,
  marginRight,
  placeholder,
  type,
  id,
  onChange,
  isCurrency,
  disabled, 
}: InputProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <StyledInput
          {...field}
          $width={width}
          $marginRight={marginRight}
          type={type}
          id={id}
          placeholder={placeholder}
          $disabled={disabled} 
          onChange={(e) => {
            field.onChange(e)
            if (isCurrency) {
              const value =
                parseFloat(e.target.value.replace(/[^0-9]/g, '')) / 100
              const formattedValue = value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
              field.onChange(formattedValue)
            } else {
              field.onChange(e)
            }

            if (onChange) {
              onChange(e)
            }
          }}
        />
      )}
    />
  )
}
