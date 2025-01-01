import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { UtilsService } from '../utils/utils.service';
import { plainToInstance } from 'class-transformer';
import { CompanyDTO } from './dtos/company.dto';
import { DataSource } from 'typeorm';
import { CompanyMapper } from './mapper/company.mapper';

describe('CompanyService', () => {
  let service: CompanyService;
  const mockedUtilsService = {
    buildDTO: jest.fn(),
    buildOptions: jest.fn()
  };
  const mockedManager = {
    save: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn()
  };
  const mockedMapper: CompanyMapper = {
    transform: jest.fn()
  };
  const mockedDataSource = {
    createQueryRunner: () => {
      return {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        release: jest.fn(),
        manager: mockedManager
      };
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyService, { provide: UtilsService, useValue: mockedUtilsService }, { provide: CompanyMapper, useValue: mockedMapper }, { provide: DataSource, useValue: mockedDataSource }]
    }).compile();
    service = module.get<CompanyService>(CompanyService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('expect create method executed successfully ', async () => {
    await service.create(
      plainToInstance(CompanyDTO, {
        createDate: new Date(),
        cuit: '12345678901',
        bussinessName: 'empresa 1'
      })
    );
  });
  it('expect an Error when create method fails ', async () => {
    jest.spyOn(mockedManager, 'save').mockImplementationOnce(() => Promise.reject({ error: 'some error' }));
    try {
      await service.create(
        plainToInstance(CompanyDTO, {
          createDate: new Date(),
          cuit: '12345678901',
          bussinessName: 'empresa 1'
        })
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Array of Companies when find method is called ', async () => {
    const result: Array<any> = [
      {
        id: 1,
        createDate: new Date(),
        cuit: '12345678901',
        bussinessName: 'empresa 1'
      }
    ];
    const dto: Array<CompanyDTO> = plainToInstance(CompanyDTO, result);
    jest.spyOn(mockedManager, 'find').mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findAll({
      skip: 2,
      take: 1,
      where: { createDateSince: '2024-12-24', createDateTo: '2024-12-26' }
    });
    expect(response).toBeDefined();
  });
  it('expect an Array of Companies when find method is called and passing an undefined where object', async () => {
    const result: Array<any> = [
      {
        id: 1,
        createDate: new Date(),
        cuit: '12345678901',
        bussinessName: 'empresa 1'
      }
    ];
    const dto: Array<CompanyDTO> = plainToInstance(CompanyDTO, result);
    jest.spyOn(mockedManager, 'find').mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findAll({
      skip: 2,
      take: 1,
      where: undefined
    });
    expect(response).toBeDefined();
  });
  it('expect an Array of Companies when find method is called without passing "createDateTo" criteria filter ', async () => {
    const result: Array<any> = [
      {
        id: 1,
        createDate: new Date(),
        cuit: '12345678901',
        bussinessName: 'empresa 1'
      }
    ];
    const dto: Array<CompanyDTO> = plainToInstance(CompanyDTO, result);
    jest.spyOn(mockedManager, 'find').mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findAll({
      skip: 2,
      take: 1,
      where: { createDateSince: '2024-12-24' }
    });
    expect(response).toBeDefined();
  });
  it('expect an Array of Companies when find method is called without passing "createDateSince" criteria filter ', async () => {
    const result: Array<any> = [
      {
        id: 1,
        createDate: new Date(),
        cuit: '12345678901',
        bussinessName: 'empresa 1'
      }
    ];
    const dto: Array<CompanyDTO> = plainToInstance(CompanyDTO, result);
    jest.spyOn(mockedManager, 'find').mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findAll({
      skip: 2,
      take: 1,
      where: { createDateTo: '2024-12-24' }
    });
    expect(response).toBeDefined();
  });
  it('expect a Company to be returned', async () => {
    const result: any = {
      id: 1,
      createDate: new Date(),
      cuit: '12345678901',
      bussinessName: 'empresa 1'
    };
    const dto: CompanyDTO = plainToInstance(CompanyDTO, result);
    jest.spyOn(mockedManager, 'findOne').mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findById(1);
    expect(response).toBeDefined();
  });
  it('expect an Array of Companies when findAllByTransactions method is called without passing "transferDateSince" criteria filter ', async () => {
    const result: Array<any> = [
      {
        id: 1,
        createDate: new Date(),
        cuit: '12345678901',
        bussinessName: 'empresa 1'
      }
    ];
    const dto: Array<CompanyDTO> = plainToInstance(CompanyDTO, result);
    jest.spyOn(mockedManager, 'find').mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findAllByTransactions({
      skip: 2,
      take: 1,
      where: { transferDateTo: '2024-12-24' }
    });
    expect(response).toBeDefined();
  });
  it('expect an Array of Companies when findAllByTransactions method is called without passing "transferDateTo" criteria filter ', async () => {
    const result: Array<any> = [
      {
        id: 1,
        createDate: new Date(),
        cuit: '12345678901',
        bussinessName: 'empresa 1'
      }
    ];
    const dto: Array<CompanyDTO> = plainToInstance(CompanyDTO, result);
    jest.spyOn(mockedManager, 'find').mockImplementation(() => Promise.resolve(result));
    mockedUtilsService.buildDTO.mockImplementation(() => Promise.resolve(dto));
    const response = await service.findAllByTransactions({
      skip: 2,
      take: 1,
      where: { transferDateSince: '2024-12-24' }
    });
    expect(response).toBeDefined();
  });
});
