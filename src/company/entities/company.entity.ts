import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Transaction, (transaction) => transaction.company, {
    cascade: ['insert', 'remove']
  })
  transactions: Transaction[];

  @Column({ type: 'varchar', length: 40 })
  cuit: string;

  @Column({ type: 'datetime', name: 'create_date' })
  createDate: Date;

  @Column({ type: 'varchar', length: 40, name: 'bussiness_name' })
  bussinessName: string;
}
