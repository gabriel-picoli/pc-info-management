/* eslint-disable @typescript-eslint/no-unused-vars */

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { FechamentoService } from './fechamento.service';
import { Fechamento } from './fechamento.entity';
import { CreateFechamentoDto } from './dtos/fechamentoDto.dto';

@Controller('fechamento')
export class FechamentoController {
  constructor(private readonly fechamentoService: FechamentoService) {}
  @Post()
  create(
    @Body() createFechamentoDto: CreateFechamentoDto,
  ): Promise<Fechamento> {
    return this.fechamentoService.create(createFechamentoDto);
  }

  @Get()
  findAll(): Promise<Fechamento[]> {
    return this.fechamentoService.findAll();
  }

  @Get(':id')
  async getFechamentoById(@Param('id') id: number) {
    return this.fechamentoService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.fechamentoService.remove(id);
  }
}
