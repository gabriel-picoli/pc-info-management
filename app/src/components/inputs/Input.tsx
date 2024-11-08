/* eslint-disable @typescript-eslint/no-explicit-any */

import { Controller, Control, FieldValues } from 'react-hook-form'
import styled from 'styled-components'

const StyledInput = styled.input<{ $width?: string; $marginRight?: string }>`
  width: ${(props) => props.$width || '100%'};
  height: 30px;
  background-color: transparent;
  border: 1px solid #222222;
  border-radius: 5px;
  padding: 10px;
  font-size: 13px;
  color: black;
  margin-right: ${(props) => props.$marginRight || '0px'};
  outline: none;

  &::placeholder {
    color: #999;
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
