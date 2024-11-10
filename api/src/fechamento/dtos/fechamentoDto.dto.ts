import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateFechamentoDto {
  @IsString()
  data: string;

  @IsString()
  nomeCliente: string;

  @IsString()
  servico: string;

  @IsBoolean()
  deve: boolean;

  @IsOptional()
  @IsNumber()
  valorDevido?: number;

  @IsOptional()
  @IsNumber()
  valorPago?: number;

  @IsString()
  formaPagamento: string;

  @IsString()
  contaAplicada: string;
}
