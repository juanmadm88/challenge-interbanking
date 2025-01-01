import { IsISO8601, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AccountDTO } from './account.dto';
/* istanbul ignore file */

export class TransactionDTO {
  constructor(args: any) {
    if (args) {
      const { id, amount, transferDate, accountTarget, accountSource } = args;
      if (id) this.id = id;
      if (amount) this.amount = amount;
      if (transferDate) this.transferDate = transferDate;
      if (accountTarget) this.accountTarget = accountTarget;
      if (accountSource) this.accountSource = accountSource;
    }
  }
  @ApiProperty({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The Transaction id'
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  @ApiProperty({
    name: 'amount',
    type: 'decimal',
    required: true,
    description: 'The amount of the transaction '
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  private amount: number;

  @ApiProperty({
    name: 'transferDate',
    type: 'datetime',
    required: true,
    description: 'The date of the transaction '
  })
  @IsNotEmpty()
  @IsISO8601()
  @Expose()
  private transferDate: Date;

  @ApiProperty({
    name: 'accountTarget',
    type: AccountDTO,
    required: false,
    description: 'An account target'
  })
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => AccountDTO)
  private accountTarget?: AccountDTO;

  @ApiProperty({
    name: 'accountSource',
    type: AccountDTO,
    required: false,
    description: 'An account source'
  })
  @Expose()
  @IsOptional()
  @ValidateNested()
  @Type(() => AccountDTO)
  private accountSource?: AccountDTO;

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }

  public getAmount(): number {
    return this.amount;
  }
  public setAmount(amount: number) {
    this.amount = amount;
  }

  public getTransferDate(): Date {
    return this.transferDate;
  }
  public setTransferDate(date: Date) {
    this.transferDate = date;
  }
  public getAccountTarget(): AccountDTO {
    return this.accountTarget;
  }
  public setAccountTarget(account: AccountDTO) {
    this.accountTarget = account;
  }
  public getAccountSource(): AccountDTO {
    return this.accountSource;
  }
  public setAccountSource(account: AccountDTO) {
    this.accountSource = account;
  }
}
