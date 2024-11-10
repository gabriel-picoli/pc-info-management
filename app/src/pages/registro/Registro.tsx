/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import styled from 'styled-components'

import { fechamentoSchema } from '../../utils/fechamento/fechamentoSchema'

import Input from '../../components/inputs/Input'
import Dropdown from '../../components/inputs/Dropdown'
import Button from '../../components/buttons/Button'

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const ButtonContainer = styled.div`
  margin: 20px 0 30px 0;
`

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`

export default function Registro() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(fechamentoSchema),
  })

  const onSubmit = (data: any) => {
    console.log('dados enviados ao back:', data)
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <label htmlFor="data">Data</label>
        <Input
          name="data"
          control={control}
          type="text"
          id="data"
          placeholder="Digite a data"
        />
        {errors.data && <ErrorMessage>{`${errors.data.message}`}</ErrorMessage>}
      </FormField>

      <FormField>
        <label htmlFor="nomeCliente">Nome do Cliente</label>
        <Input
          name="nomeCliente"
          control={control}
          type="text"
          id="nomeCliente"
          placeholder="Digite o nome do cliente"
        />
        {errors.nomeCliente && (
          <ErrorMessage>{`${errors.nomeCliente.message}`}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <label htmlFor="servico">Serviço Realizado</label>
        <Input
          name="servico"
          control={control}
          type="text"
          id="servico"
          placeholder="Digite o serviço realizado"
        />
        {errors.servico && (
          <ErrorMessage>{`${errors.servico.message}`}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <label htmlFor="deve">Deve?</label>
        <Dropdown
          name="deve"
          control={control}
          id="deve"
          options={[
            { label: 'Sim', value: 'true' },
            { label: 'Não', value: 'false' },
          ]}
          placeholder="Selecione uma opção"
        />
        {errors.deve && <ErrorMessage>{`${errors.deve.message}`}</ErrorMessage>}
      </FormField>

      <FormField>
        <label htmlFor="valorDevido">Valor Devido</label>
        <Input
          name="valorDevido"
          control={control}
          type="number"
          id="valorDevido"
          placeholder="Valor devido"
          isCurrency
        />
        {errors.valorDevido && (
          <ErrorMessage>{`${errors.valorDevido.message}`}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <label htmlFor="valorPago">Valor Pago</label>
        <Input
          name="valorPago"
          control={control}
          type="text"
          id="valorPago"
          placeholder="Valor pago"
          isCurrency
        />
        {errors.valorPago && (
          <ErrorMessage>{`${errors.valorPago.message}`}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <label htmlFor="formaPagamento">Forma de Pagamento</label>
        <Dropdown
          name="formaPagamento"
          control={control}
          id="formaPagamento"
          options={[
            { label: 'Dinheiro', value: 'dinheiro' },
            { label: 'Cartão', value: 'cartao' },
            { label: 'PIX', value: 'pix' },
          ]}
          placeholder="Selecione uma opção"
        />
        {errors.formaPagamento && (
          <ErrorMessage>{`${errors.formaPagamento.message}`}</ErrorMessage>
        )}
      </FormField>

      <FormField>
        <label htmlFor="contaAplicada">Conta Aplicada</label>
        <Dropdown
          name="contaAplicada"
          control={control}
          id="contaAplicada"
          options={[
            { label: 'Conta 1', value: 'conta1' },
            { label: 'Conta 2', value: 'conta2' },
          ]}
          placeholder="Selecione uma opção"
        />
        {errors.contaAplicada && (
          <ErrorMessage>{`${errors.contaAplicada.message}`}</ErrorMessage>
        )}
      </FormField>

      <ButtonContainer>
        <Button type="submit">Salvar</Button>
      </ButtonContainer>
    </FormContainer>
  )
}
