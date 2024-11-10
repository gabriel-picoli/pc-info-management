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

  async remove(id: number): Promise<void> {
    await this.registroRepository.delete(id);
  }
}
