import Joi from 'joi'

export const fechamentoSchema = Joi.object({
  data: Joi.string().required().messages({
    'string.empty': 'Data é obrigatória',
  }),
  nomeCliente: Joi.string().required().messages({
    'string.empty': 'Nome do cliente é obrigatório',
  }),
  servico: Joi.string().required().messages({
    'string.empty': 'Serviço é obrigatório',
  }),
  deve: Joi.string().valid('true', 'false').required().messages({
    'any.only': 'Deve? deve ser Sim ou Não',
  }),
  valorDevido: Joi.number().positive().required().messages({
    'number.base': 'Valor devido deve ser um número',
    'number.positive': 'Valor devido deve ser maior que zero',
  }),
  valorPago: Joi.number().positive().required().messages({
    'number.base': 'Valor pago deve ser um número',
    'number.positive': 'Valor pago deve ser maior que zero',
  }),
  formaPagamento: Joi.string()
    .valid('dinheiro', 'cartao', 'pix')
    .required()
    .messages({
      'any.only': 'Forma de pagamento inválida',
    }),
  contaAplicada: Joi.string().valid('conta1', 'conta2').required().messages({
    'any.only': 'Conta aplicada inválida',
  }),
})
