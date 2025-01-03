import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { CompanyDTO } from '../company/dtos/company.dto';

describe('UtilsService', () => {
  let service: UtilsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService]
    }).compile();
    service = module.get<UtilsService>(UtilsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should expect a DTO with its attributes ', () => {
    const plainObject = {
      createDate: new Date(),
      cuit: '12345678901',
      bussinessName: 'empresa 1'
    };
    const result: any = service.buildDTO(plainObject, CompanyDTO);
    expect(result).toBeInstanceOf(CompanyDTO);
  });
  it('expect empty object  ', () => {
    const result = service.buildOptions(undefined);
    expect(!Object.keys(result).length).toBeTruthy();
  });
  it('expect object with keys  ', () => {
    const result = service.buildOptions({
      skip: 10,
      size: 30,
      createDateSince: '2024-12-30'
    });
    expect(Object.keys(result).length).toBeTruthy();
  });
  it('expect empty object when calling buildDbOptions method with undefined argument ', () => {
    const result = service.buildDbOptions(undefined, 'findAll');
    expect(!Object.keys(result).length).toBeTruthy();
  });
  it('expect an object with skip & take keys when calling buildDbOptions method with skip and take arguments ', () => {
    const result = service.buildDbOptions({ skip: 1, take: 2, where: {} }, 'findAll');
    expect(Object.keys(result).length).toBeTruthy();
    expect('skip' in result).toBeTruthy();
    expect('take' in result).toBeTruthy();
  });
  it('expect an object with certain keys when calling buildDbOptions method for building findById options ', () => {
    const result = service.buildDbOptions({ where: { id: 1 } }, 'findById');
    expect(Object.keys(result).length).toBeTruthy();
    expect('skip' in result).toBeFalsy();
    expect('take' in result).toBeFalsy();
    expect('id' in result.where).toBeTruthy();
  });
  it('expect an object with certain keys when calling buildDbOptions method for building findAll options ', () => {
    const result = service.buildDbOptions({ skip: 1, take: 2, where: { createDateSince: '2024-12-11' } }, 'findAll');
    expect(Object.keys(result).length).toBeTruthy();
    expect('skip' in result).toBeTruthy();
    expect('take' in result).toBeTruthy();
    expect('createDate' in result.where).toBeTruthy();
  });
  it('expect an object with certain keys when calling buildDbOptions method for building findAllByTransactions options ', () => {
    const result = service.buildDbOptions({ skip: 1, take: 2, where: { transferDateSince: '2024-12-11' } }, 'findAllByTransactions');
    expect(Object.keys(result).length).toBeTruthy();
    expect('skip' in result).toBeTruthy();
    expect('take' in result).toBeTruthy();
    expect('transactions' in result.where).toBeTruthy();
  });
});
