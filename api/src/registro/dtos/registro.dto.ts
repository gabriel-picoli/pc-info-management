import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateRegistroDto {
  @IsString({ message: 'A data é obrigatória e deve ser uma string.' })
  data: string;

  @IsString({
    message: 'O nome do cliente é obrigatório e deve ser uma string.',
  })
  nomeCliente: string;

  @IsString({
    message: 'O serviço realizado é obrigatório e deve ser uma string.',
  })
  servico: string;

  @IsBoolean({ message: 'O campo "deve" deve ser verdadeiro ou falso.' })
  deve: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'O valor devido deve ser um número.' })
  valorDevido?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O valor pago deve ser um número.' })
  valorPago?: number;

  @IsString({
    message: 'A forma de pagamento é obrigatória e deve ser uma string.',
  })
  formaPagamento: string;

  @IsString({
    message: 'A conta aplicada é obrigatória e deve ser uma string.',
  })
  contaAplicada: string;
}
