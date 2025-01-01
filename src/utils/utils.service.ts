import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Constants } from '../constants';
import { QueryParamsCompany, QueryParamsTransaction } from '../constants/common';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class UtilsService {
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
}
