import { IsString, IsNumber, IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AccountTypeDTO } from './account-type.dto';
/* istanbul ignore file */

export class AccountDTO {
  constructor(args: any) {
    if (args) {
      const { id, cbu, alias, accountType } = args;
      if (id) this.id = id;
      if (cbu) this.cbu = cbu;
      if (alias) this.alias = alias;
      if (accountType) this.accountType = accountType;
    }
  }
  @ApiProperty({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The Account id'
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  @ApiProperty({
    name: 'cbu',
    type: 'String',
    required: true,
    description: 'The cbu of the Account '
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  private cbu: string;

  @ApiProperty({
    name: 'alias',
    type: 'String',
    required: true,
    description: 'The alias of the Account '
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  private alias: string;

  @ApiProperty({
    name: 'accountType',
    type: AccountTypeDTO,
    required: true,
    description: 'The Account Type '
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Expose()
  @Type(() => AccountTypeDTO)
  private accountType: AccountTypeDTO;

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }

  public getCbu(): string {
    return this.cbu;
  }
  public setCbu(cbu: string) {
    this.cbu = cbu;
  }

  public getAlias(): string {
    return this.alias;
  }
  public setAlias(alias: string) {
    this.alias = alias;
  }

  public getAccountType(): AccountTypeDTO {
    return this.accountType;
  }
  public setAccountType(accountType: AccountTypeDTO) {
    this.accountType = accountType;
  }
}
