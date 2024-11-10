import Joi from 'joi'

export const registroSchema = Joi.object({
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
  valorDevido: Joi.string()
    .allow('')
    .when('deve', {
      is: 'false',
      then: Joi.optional(),
      otherwise: Joi.required().messages({
        'string.empty': 'Valor devido é obrigatório quando "Deve?" for "Sim"',
      }),
    }),
  valorPago: Joi.string()
    .allow('')
    .when('deve', {
      is: 'true',
      then: Joi.optional(),
      otherwise: Joi.required().messages({
        'string.empty': 'Valor pago é obrigatório quando "Deve?" for "Não"',
      }),
    }),
  formaPagamento: Joi.string()
    .valid('dinheiro', 'debito', 'credito', 'boleto', 'cheque', 'pix')
    .required()
    .messages({
      'any.only': 'Forma de pagamento inválida',
    }),
  contaAplicada: Joi.string().allow('').valid('paulo', 'neuza').messages({
    'any.only': 'Conta aplicada inválida',
  }),
})
