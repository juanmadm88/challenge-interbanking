import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Transaction } from './entities/transaction.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyMapper } from './mapper/company.mapper';
import { Account } from './entities/account.entity';
import { AccountType } from './entities/account-type.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Company, Transaction, Account, AccountType])],
  providers: [CompanyService, CompanyMapper],
  controllers: [CompanyController]
})
export class CompanyModule {}
