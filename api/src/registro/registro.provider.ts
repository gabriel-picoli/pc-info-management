import { DataSource } from 'typeorm';

import { Registro } from './registro.entity';

export const registroProviders = [
  {
    provide: 'REGISTRO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Registro),
    inject: ['DATA_SOURCE'],
  },
];
