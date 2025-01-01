import { Injectable } from '@nestjs/common';
import { IMapper } from '../../constants/common';
import { Company } from '../entities/company.entity';

@Injectable()
export class CompanyMapper implements IMapper {
  public transform(dto: any): Company {
    const company: Company = new Company();
    company.createDate = dto.getCreateDate();
    company.cuit = dto.getCuit();
    company.bussinessName = dto.getBussinessName();
    return company;
  }
}
