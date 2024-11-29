import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Registro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  data: Date;

  @Column()
  nomeCliente: string;

  @Column()
  servico: string;

  @Column()
  deve: boolean;

  @Column({ type: 'float', nullable: true })
  valorDevido: number;

  @Column({ type: 'float', nullable: true })
  valorPago: number;

  @Column()
  formaPagamento: string;

  @Column()
  contaAplicada: string;
}
