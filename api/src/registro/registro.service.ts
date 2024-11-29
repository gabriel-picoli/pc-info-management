import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Registro } from './registro.entity';
import { CreateRegistroDto } from './dtos/registro.dto';

@Injectable()
export class RegistroService {
  constructor(
    @Inject('REGISTRO_REPOSITORY')
    private registroRepository: Repository<Registro>,
  ) {}
  async create(createRegistroDto: CreateRegistroDto): Promise<Registro> {
    const registro = this.registroRepository.create(createRegistroDto);
    return this.registroRepository.save(registro);
  }

  async findAll(): Promise<Registro[]> {
    return this.registroRepository.find();
  }

  async findById(id: number): Promise<Registro> {
    const registro = await this.registroRepository.findOne({
      where: { id }, // id eh passado detro do where
    });

    if (!registro) {
      throw new Error('Registro não encontrado');
    }

    return registro;
  }

  async getFechamentoMes(mes: number, ano: number) {
    const registros = await this.registroRepository
      .createQueryBuilder('registro')
      .select([
        'registro.formaPagamento',
        'registro.contaAplicada',
        'SUM(registro.valorPago) AS totalPago', // soma total pago por forma de pagamento e conta
        'SUM(CASE WHEN registro.deve = true THEN registro.valorDevido ELSE 0 END) AS totalDevido', // soma o total a receber
      ])
      .where('MONTH(registro.data) = :mes', { mes })
      .andWhere('YEAR(registro.data) = :ano', { ano })
      .groupBy('registro.formaPagamento, registro.contaAplicada') // agrupa por forma de pagamento e conta
      .getRawMany();

    return registros;
  }

  async remove(id: number): Promise<void> {
    await this.registroRepository.delete(id);
  }
}
