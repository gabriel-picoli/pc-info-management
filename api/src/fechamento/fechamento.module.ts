import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { fechamentoProviders } from './fechamento.provider';
import { FechamentoService } from './fechamento.service';
import { FechamentoController } from './fechamento.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...fechamentoProviders, FechamentoService],
  controllers: [FechamentoController],
})
export class FechamentoModule {}
