import { DataSource } from 'typeorm';

import { Fechamento } from './fechamento.entity';

export const fechamentoProviders = [
  {
    provide: 'FECHAMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Fechamento),
    inject: ['DATA_SOURCE'],
  },
];
