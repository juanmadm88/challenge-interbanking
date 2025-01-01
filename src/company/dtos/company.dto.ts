import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsOptional, IsNumber, ValidateNested, IsArray, IsISO8601, IsNotEmpty, Length, IsString } from 'class-validator';
import { TransactionDTO } from './transaction.dto';

/* istanbul ignore file */

export class CompanyDTO {
  constructor(args: any) {
    if (args) {
      const { cuit, id, transactions, bussinessName, createDate } = args;
      if (id) this.id = id;
      if (cuit) this.cuit = cuit;
      if (createDate) this.createDate = createDate;
      if (bussinessName) this.bussinessName = bussinessName;
      if (transactions) this.transactions = transactions;
    }
  }

  @ApiProperty({
    name: 'id',
    type: 'number',
    required: false,
    description: 'The Company id'
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  private id?: number;

  @ApiProperty({
    name: 'transactions',
    type: Array<TransactionDTO>,
    required: true,
    description: 'An Array of transactions'
  })
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => TransactionDTO)
  private transactions?: Array<TransactionDTO>;

  @ApiProperty({
    name: 'createDate',
    type: 'datetime',
    required: true,
    description: 'The date of the company creation '
  })
  @IsNotEmpty()
  @IsISO8601()
  @Expose()
  private createDate: Date;

  @ApiProperty({
    name: 'cuit',
    type: 'String',
    required: true,
    description: 'The cuit of the Company '
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  @Length(11, 11, { message: 'Cuit lenght must be 11' })
  private cuit: string;

  @ApiProperty({
    name: 'bussinessName',
    type: 'String',
    required: true,
    description: 'The name of the Company '
  })
  @IsNotEmpty()
  @Expose()
  private bussinessName: string;

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }

  public getCuit(): string {
    return this.cuit;
  }
  public setCuit(cuit: string) {
    this.cuit = cuit;
  }

  public getBussinessName(): string {
    return this.bussinessName;
  }
  public setBussinessName(name: string) {
    this.bussinessName = name;
  }

  public getCreateDate(): Date {
    return this.createDate;
  }
  public setCreateDate(date: Date) {
    this.createDate = date;
  }

  public getTransactions(): Array<TransactionDTO> {
    return this.transactions;
  }
  public setTransactions(transactions: Array<TransactionDTO>) {
    this.transactions = transactions;
  }
}
