/* eslint-disable @typescript-eslint/no-unused-vars */

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { RegistroService } from './registro.service';
import { Registro } from './registro.entity';
import { CreateRegistroDto } from './dtos/registro.dto';

@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  create(@Body() createRegistroDto: CreateRegistroDto): Promise<Registro> {
    return this.registroService.create(createRegistroDto);
  }

  @Get()
  findAll(): Promise<Registro[]> {
    return this.registroService.findAll();
  }

  @Get(':id')
  async getRegistroById(@Param('id') id: number) {
    return this.registroService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.registroService.remove(id);
  }
}
