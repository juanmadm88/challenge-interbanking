import { Test, TestingModule } from '@nestjs/testing';
import { CompanyMapper } from './company.mapper';
import { Company } from '../entities/company.entity';

describe('CompanyMapper', () => {
  let service: CompanyMapper;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyMapper]
    }).compile();
    service = module.get<CompanyMapper>(CompanyMapper);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('transform', () => {
    it('expect a Company as a response ', async () => {
      const dto: any = {
        getBussinessName: () => {
          return 'empresa 1';
        },
        getCreateDate: () => {
          return new Date();
        },
        getCuit: () => {
          return '20342952071';
        }
      };
      const response: Company = service.transform(dto);
      expect(response).toBeInstanceOf(Company);
      expect(response.bussinessName).toBe('empresa 1');
    });
  });
});
