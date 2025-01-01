import { FindManyOptions } from 'typeorm';

export interface QueryParams {
  skip?: number;
  size?: number;
}
export interface QueryParamsCompany extends QueryParams {
  createDateSince?: string;
  createDateTo?: string;
}
export interface QueryParamsTransaction extends QueryParams {
  transferDateSince?: string;
  transferDateTo?: string;
}

export interface FindQueryOptions extends FindManyOptions {
  where?: any;
}

export interface IMapper {
  transform(dto: any): any;
}
