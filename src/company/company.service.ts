import { Injectable } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { CompanyDTO } from './dtos/company.dto';
import { DataSource, Between } from 'typeorm';
import { CompanyMapper } from './mapper/company.mapper';
import { Company } from './entities/company.entity';
import { FindQueryOptions } from '../constants/common';

@Injectable()
export class CompanyService {
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
    const options: any = this.buildOptions(args);
    const today: Date = new Date();
    options.where = {
      createDate: Between(args.where?.createDateSince || today.setDate(today.getDate() - 30), args.where?.createDateTo || today)
    };
    return this.utils.buildDTO(await queryRunner.manager.find(Company, options), CompanyDTO);
  }

  private buildOptions(options: FindQueryOptions): any {
    const result: any = {};
    if (options.skip) result.skip = options.skip;
    if (options.take) result.take = options.take;
    return result;
  }

  async findById(id: number): Promise<CompanyDTO> {
    const queryRunner = this.dataSource.createQueryRunner();
    let options: any = {};
    const relations: string[] = ['transactions', 'transactions.accountTarget', 'transactions.accountSource', 'transactions.accountTarget.accountType', 'transactions.accountSource.accountType'];
    options = { where: { id }, relations };
    return this.utils.buildDTO(await queryRunner.manager.findOne(Company, options), CompanyDTO);
  }

  async findAllByTransactions(args: FindQueryOptions = {}): Promise<Array<CompanyDTO>> {
    const queryRunner = this.dataSource.createQueryRunner();
    const options: any = this.buildOptions(args);
    const today: Date = new Date();
    options.where = {
      transactions: {
        transferDate: Between(args.where?.transferDateSince || today.setDate(today.getDate() - 30), args.where?.transferDateTo || today)
      }
    };
    options.relations = ['transactions'];
    return this.utils.buildDTO(await queryRunner.manager.find(Company, options), CompanyDTO);
  }
}
