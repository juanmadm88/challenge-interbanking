import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Logger } from '@nestjs/common';
import { UtilsService } from '../utils/utils.service';
import { AuthGuard } from '../authentication/guard/auth.guard';
import { CompanyDTO } from './dtos/company.dto';
import { plainToInstance } from 'class-transformer';

describe('CompanyController', () => {
  let controller: CompanyController;
  const mockedService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findAllByTransactions: jest.fn()
  };
  const mockedAuthGuard = {
    canActivate: jest.fn()
  };
  const mockedLogger = {
    log: jest.fn()
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [{ provide: CompanyService, useValue: mockedService }, { provide: Logger, useValue: mockedLogger }, UtilsService]
    })
      .overrideGuard(AuthGuard)
      .useValue(mockedAuthGuard)
      .compile();
    controller = app.get<CompanyController>(CompanyController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('expect create method executed successfully', async () => {
    const spy = jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.resolve({ status: 200 }));
    const dto: CompanyDTO = plainToInstance(CompanyDTO, {
      createDate: new Date(),
      cuit: '12345678901',
      bussinessName: 'empresa 1'
    });
    await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    expect(spy).toBeCalledTimes(1);
  });
  it('expect an Error when create method fails', async () => {
    jest.spyOn(mockedService, 'create').mockImplementation(() => Promise.reject({ status: 404 }));
    const dto: CompanyDTO = plainToInstance(CompanyDTO, {
      createDate: new Date(),
      cuit: '12345678901',
      bussinessName: 'empresa 1'
    });
    try {
      await controller.create(dto, '9568be23-16c6-4d87-8dd0-614b34a6c830');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Error when findAll service method fails', async () => {
    jest.spyOn(mockedService, 'findAll').mockImplementation(() => Promise.reject({ status: 404 }));
    try {
      await controller.get('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Error when findAll service method fails', async () => {
    jest.spyOn(mockedService, 'findById').mockImplementation(() => Promise.reject({ status: 404 }));
    try {
      await controller.getById('9568be23-16c6-4d87-8dd0-614b34a6c830', 124);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('expect an Error when findAll service method fails', async () => {
    jest.spyOn(mockedService, 'findAllByTransactions').mockImplementation(() => Promise.reject({ status: 404 }));
    try {
      await controller.getByTransactions('9568be23-16c6-4d87-8dd0-614b34a6c830', {});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
