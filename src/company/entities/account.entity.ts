import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountType } from './account-type.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40 })
  cbu: string;

  @Column({ type: 'varchar', length: 40 })
  alias: string;

  @ManyToOne(() => AccountType)
  @JoinColumn({ name: 'id_account_type', referencedColumnName: 'id' })
  accountType: AccountType;
}
