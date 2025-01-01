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
});
