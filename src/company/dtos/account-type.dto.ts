import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
/* istanbul ignore file */

export class AccountTypeDTO {
  constructor(args: any) {
    if (args) {
      const { id, description } = args;
      if (id) this.id = id;
      if (description) this.description = description;
    }
  }
  @ApiProperty({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The Account Type id'
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  private id: number;

  @ApiProperty({
    name: 'description',
    type: 'String',
    required: true,
    description: 'The description of the Account Type '
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  private description: string;

  public getId(): number {
    return this.id;
  }
  public setId(id: number) {
    this.id = id;
  }

  public getDescription(): string {
    return this.description;
  }
  public setDescription(description: string) {
    this.description = description;
  }
}
