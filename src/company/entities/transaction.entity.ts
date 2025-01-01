import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from './company.entity';
import { Account } from './account.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'id_company', referencedColumnName: 'id' })
  company: Company;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ type: 'datetime', name: 'transfer_date' })
  transferDate: Date;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'id_account_source', referencedColumnName: 'id' })
  accountSource: Account;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'id_account_target', referencedColumnName: 'id' })
  accountTarget: Account;
}
