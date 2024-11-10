import { Module } from '@nestjs/common';

import { FechamentoModule } from './fechamento/fechamento.module';

@Module({
  imports: [FechamentoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
