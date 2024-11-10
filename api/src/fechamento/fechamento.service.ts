import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Fechamento } from './fechamento.entity';
import { CreateFechamentoDto } from './dtos/fechamentoDto.dto';

@Injectable()
export class FechamentoService {
  constructor(
    @Inject('FECHAMENTO_REPOSITORY')
    private fechamentoRepository: Repository<Fechamento>,
  ) {}
  async create(createFechamentoDto: CreateFechamentoDto): Promise<Fechamento> {
    const fechamento = this.fechamentoRepository.create(createFechamentoDto);
    return this.fechamentoRepository.save(fechamento);
  }

  async findAll(): Promise<Fechamento[]> {
    return this.fechamentoRepository.find();
  }

  async findById(id: number): Promise<Fechamento> {
    const fechamento = await this.fechamentoRepository.findOne({
      where: { id }, // Aqui estamos passando o ID dentro de um objeto 'where'
    });

    if (!fechamento) {
      throw new Error('Fechamento não encontrado');
    }

    return fechamento;
  }

  async remove(id: number): Promise<void> {
    await this.fechamentoRepository.delete(id);
  }
}
