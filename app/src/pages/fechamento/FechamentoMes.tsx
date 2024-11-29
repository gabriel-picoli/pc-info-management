/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import api from '../../axios-config'

import Input from '../../components/inputs/Input'
import Button from '../../components/buttons/Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`

const InputContainer = styled.div`
  display: flex;
  gap: 20px;
`

const Label = styled.label`
  font-weight: bold;
  margin-right: 15px;
`

const FechamentoInfo = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Section = styled.div`
  margin-bottom: 20px;
`

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.2em;
  color: #333;
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
`

const Total = styled.div`
  font-weight: bold;
  margin-top: 20px;
`

const TotalValue = styled.span`
  font-size: 1.5em;
`

const TotalDebtValue = styled.span`
  font-size: 1.5em;
  color: #c02929;
`

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f8f8f8;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`

// funçao para converter numero do mes em nome
const obterNomeMes = (mes: number) => {
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]
  return meses[mes - 1] || ''
}

export default function FechamentoMes() {
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1)
  const [ano, setAno] = useState<number>(new Date().getFullYear())
  const [fechamento, setFechamento] = useState<any[]>([])

  const { control } = useForm()

  const handleBuscarFechamento = async () => {
    try {
      const response = await api.get(`registro/fechamento/${mes}/${ano}`)
      console.log(response.data)

      setFechamento(response.data)
    } catch (error) {
      console.error('Erro ao buscar o fechamento:', error)
    }
  }

  const calcularTotalPago = (fechamento: any[]) => {
    return fechamento.reduce((acc, item) => acc + item.totalPago, 0).toFixed(2)
  }

  const calcularTotalDevido = (fechamento: any[]) => {
    return fechamento
      .reduce((acc, item) => acc + item.totalDevido, 0)
      .toFixed(2)
  }

  return (
    <Container>
      <h1>
        {obterNomeMes(mes)} de {ano}
      </h1>

      {fechamento.length > 0 ? (
        <FechamentoInfo>
          <Section>
            <SectionTitle>Formas de Pagamento</SectionTitle>
            <List>
              {fechamento
                .filter(
                  (item) => item.registro_formaPagamento && item.totalPago > 0
                ) // filtra registros com forma de pagamento
                .map((item, index) => (
                  <ListItem key={index}>
                    <span>{item.registro_formaPagamento}: </span>
                    <span>R${item.totalPago.toFixed(2)}</span>
                  </ListItem>
                ))}
            </List>
          </Section>

          <Section>
            <SectionTitle>Contas Aplicadas</SectionTitle>
            <List>
              {Object.entries(
                fechamento.reduce<Record<string, number>>((acc, item) => {
                  const conta = item.registro_contaAplicada
                  if (!acc[conta]) {
                    acc[conta] = 0
                  }
                  acc[conta] += item.totalPago
                  return acc
                }, {})
              ).map(([conta, total], index) => (
                <ListItem key={index}>
                  <span>{conta}: </span>
                  <span>R${total.toFixed(2)}</span>
                </ListItem>
              ))}
            </List>
          </Section>

          <Total>
            <h3>Valor Total Pago: </h3>
            <TotalValue>R${calcularTotalPago(fechamento)}</TotalValue>
          </Total>

          <Total>
            <h3>Valor Total a Receber: </h3>
            <TotalDebtValue>R${calcularTotalDevido(fechamento)}</TotalDebtValue>
          </Total>
        </FechamentoInfo>
      ) : (
        <p>Nenhum registro encontrado para este mês.</p>
      )}

      <FooterContainer>
        <InputContainer>
          <div>
            <Label>Mês:</Label>
            <Input
              control={control}
              name="mes"
              type="number"
              width="40px"
              id="mes"
              defaultValue={mes}
              onChange={(e) => setMes(Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Ano:</Label>
            <Input
              control={control}
              name="ano"
              type="number"
              width="60px"
              id="ano"
              defaultValue={ano}
              onChange={(e) => setAno(Number(e.target.value))}
            />
          </div>
        </InputContainer>

        <Button onClick={handleBuscarFechamento} type="button">
          Fechar Mês
        </Button>
      </FooterContainer>
    </Container>
  )
}
