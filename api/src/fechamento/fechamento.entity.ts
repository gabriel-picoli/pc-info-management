import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Fechamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

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
