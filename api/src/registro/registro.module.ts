import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { registroProviders } from './registro.provider';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...registroProviders, RegistroService],
  controllers: [RegistroController],
})
export class RegistroModule {}
