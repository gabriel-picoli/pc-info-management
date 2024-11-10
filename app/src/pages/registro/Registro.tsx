/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import styled from 'styled-components'
import { useEffect } from 'react'

import { registroSchema } from '../../utils/registro/registroSchema'
import api from '../../axios-config'

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
    watch,
    setValue, // atualiza o valor dos campos
  } = useForm({
    resolver: joiResolver(registroSchema),
  })

  // monitora o valor do campo "deve?"
  const deveValue = watch('deve')

  const onSubmit = async (data: any) => {
    data.deve = data.deve === 'true'

    // remove a formataçao de moeda
    if (data.valorDevido) {
      data.valorDevido = parseFloat(
        data.valorDevido.replace(/[^0-9,.-]+/g, '').replace(',', '.')
      )
    }
    if (data.valorPago) {
      data.valorPago = parseFloat(
        data.valorPago.replace(/[^0-9,.-]+/g, '').replace(',', '.')
      )
    }

    // estrutura final do objeto de fechamento
    const registroObject = {
      data: data.data,
      nomeCliente: data.nomeCliente,
      servico: data.servico,
      deve: data.deve,
      valorDevido: data.valorDevido || 0,
      valorPago: data.valorPago || 0,
      formaPagamento: data.formaPagamento,
      contaAplicada: data.contaAplicada,
    }

    try {
      const response = await api.post('/registro', registroObject)
      console.log('Resposta do backend:', response.data)
    } catch (error) {
      console.error('Erro ao enviar dados ao backend:', error)
    }
  }

  // limpar os valores quando "deve?" for "nao"
  useEffect(() => {
    if (deveValue === 'false') {
      setValue('valorDevido', '') // limpa o valor quando nao deve
    } else {
      setValue('valorPago', '') // limpa o valor quando deve
    }
  }, [deveValue, setValue])

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <label htmlFor="data">Data</label>
        <Input
          name="data"
          control={control}
          type="date"
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
          disabled={deveValue === 'false'}
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
          disabled={deveValue === 'true'}
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
            { label: 'PIX', value: 'pix' },
            { label: 'Cartão Débito', value: 'debito' },
            { label: 'Cartão Crédito', value: 'credito' },
            { label: 'Boleto', value: 'boleto' },
            { label: 'Cheque', value: 'cheque' },
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
            { label: 'Paulo Cezar Picoli', value: 'paulo' },
            { label: 'Neuza Tomazelli Picoli', value: 'neuza' },
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
