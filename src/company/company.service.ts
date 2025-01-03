import { Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { CompanyDTO } from './dtos/company.dto';
import { DataSource, Between } from 'typeorm';
import { CompanyMapper } from './mapper/company.mapper';
import { Company } from './entities/company.entity';
import { FindQueryOptions } from '../constants/common';

@Injectable()
export class CompanyService {
  private readonly methods: any = {
    findAll: this.buildOptionsForFindAll,
    findAllByTransactions: this.buildOptionsForFindAllByTransactions,
    findById: this.buildOptionsForFindById
  };
  constructor(private utils: UtilsService, private dataSource: DataSource, private mapper: CompanyMapper) {}
  //Lo dejo usando una transacción por si el servicio escala y mas adelante necesita insertar/updatear
  //algun registro de alguna de las otras tablas
  async create(dto: CompanyDTO): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(this.mapper.transform(dto));
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(args: FindQueryOptions = {}): Promise<Array<CompanyDTO>> {
    const queryRunner = this.dataSource.createQueryRunner();
    const options: any = this.buildOptions(args, 'findAll');
    return this.utils.buildDTO(await queryRunner.manager.find(Company, options), CompanyDTO);
  }

  private buildOptions(options: FindQueryOptions, methodName: string): any {
    let result: any = {};
    let aux: any = {};
    if (options.skip) result.skip = options.skip;
    if (options.take) result.take = options.take;
    if (!options.where || !Object.keys(options.where).length) return result;
    if (this.methods[methodName]) aux = this.methods[methodName](options);
    result = { ...result, ...aux };
    return result;
  }

  async findById(id: number): Promise<CompanyDTO> {
    const queryRunner = this.dataSource.createQueryRunner();
    const options: any = this.buildOptions({ where: { id } }, 'findById');
    return this.utils.buildDTO(await queryRunner.manager.findOne(Company, options), CompanyDTO);
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

  async findAllByTransactions(args: FindQueryOptions = {}): Promise<Array<CompanyDTO>> {
    const queryRunner = this.dataSource.createQueryRunner();
    const options: any = this.buildOptions(args, 'findAllByTransactions');
    return this.utils.buildDTO(await queryRunner.manager.find(Company, options), CompanyDTO);
  }
}
