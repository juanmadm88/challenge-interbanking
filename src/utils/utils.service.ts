import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Constants } from '../constants';
import { FindQueryOptions, QueryParamsCompany, QueryParamsTransaction } from '../constants/common';
import { Between, FindManyOptions } from 'typeorm';

@Injectable()
export class UtilsService {
  private readonly methods: any = {
    findAll: this.buildOptionsForFindAll,
    findAllByTransactions: this.buildOptionsForFindAllByTransactions,
    findById: this.buildOptionsForFindById
  };
  public buildDTO(aPlainObject: any, classDTO: any): any {
    return plainToInstance(classDTO, aPlainObject, {
      excludeExtraneousValues: true
    });
  }

  public buildOptions(args: QueryParamsCompany | QueryParamsTransaction = {}): FindManyOptions {
    let result: any = {};
    let where: any = {};
    for (const key of Object.keys(args)) {
      if (['skip', 'size'].includes(key)) {
        const aux: any = {};
        key === 'size' ? (aux['take'] = args[key]) : (aux[key] = args[key]);
        result = { ...result, ...aux };
        continue;
      }
      const aux: any = {};
      const isValidField: boolean = Constants.VALID_FIELDS_TO_FILTER.includes(key);
      if (isValidField) {
        aux[key] = this.buildDateCriteria(args[key]);
      }
      where = { ...where, ...aux };
    }
    if (Object.keys(where).length > 0) result.where = where;
    return result;
  }

  private buildDateCriteria(value: string): string {
    return new Date(value).toISOString();
  }

  public buildDbOptions(options: FindQueryOptions = {}, methodName: string): any {
    let result: any = {};
    let aux: any = {};
    if (options.skip) result.skip = options.skip;
    if (options.take) result.take = options.take;
    if (!options.where || !Object.keys(options.where).length) return result;
    if (this.methods[methodName]) aux = this.methods[methodName](options);
    result = { ...result, ...aux };
    return result;
  }

  private buildOptionsForFindAll(args: any): any {
    const today: Date = new Date();
    return {
      where: {
        createDate: Between(args.where?.createDateSince || today.setDate(today.getDate() - 30), args.where?.createDateTo || today)
      }
    };
  }

  private buildOptionsForFindAllByTransactions(args: any): any {
    const today: Date = new Date();
    return {
      where: {
        transactions: {
          transferDate: Between(args.where?.transferDateSince || today.setDate(today.getDate() - 30), args.where?.transferDateTo || today)
        }
      },
      relations: ['transactions']
    };
  }

  private buildOptionsForFindById(args: any): any {
    return { where: { id: args.where.id }, relations: ['transactions', 'transactions.accountTarget', 'transactions.accountSource', 'transactions.accountTarget.accountType', 'transactions.accountSource.accountType'] };
  }
}
