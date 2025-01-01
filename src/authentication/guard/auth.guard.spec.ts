import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { CanActivate, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard ', () => {
  let guard: CanActivate;
  beforeAll(async () => {
    const mockedConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'appConfig.auth.secret') {
          return 'INTERBANKING_CHALLENGE$';
        }
      })
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, { provide: ConfigService, useValue: mockedConfigService }]
    }).compile();
    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate ', () => {
    it('expected UnauthorizedException error when token is undefined', async () => {
      const executionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnThis(),
        getClass: jest.fn().mockReturnThis(),
        getHandler: jest.fn().mockReturnThis(),
        getArgs: jest.fn().mockReturnThis(),
        getArgByIndex: jest.fn().mockReturnThis(),
        switchToRpc: jest.fn().mockReturnThis(),
        switchToWs: jest.fn().mockReturnThis(),
        getType: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnThis()
      };
      (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
        body: { data: 'mocked data' },
        headers: { 'x-flow-country': 'pe' }
      });
      try {
        await guard.canActivate(executionContext);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
    it('expected result to be true ', async () => {
      const mockedConfigService = {
        get: jest.fn((key: string) => {
          if (key === 'appConfig.auth.secret') {
            return 'INTERBANKING_CHALLENGE';
          }
        })
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [AuthGuard, { provide: ConfigService, useValue: mockedConfigService }]
      }).compile();
      guard = module.get<AuthGuard>(AuthGuard);
      const executionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnThis(),
        getClass: jest.fn().mockReturnThis(),
        getHandler: jest.fn().mockReturnThis(),
        getArgs: jest.fn().mockReturnThis(),
        getArgByIndex: jest.fn().mockReturnThis(),
        switchToRpc: jest.fn().mockReturnThis(),
        switchToWs: jest.fn().mockReturnThis(),
        getType: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnThis()
      };
      (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
        body: { data: 'mocked data' },
        headers: {
          app_key: 'INTERBANKING_CHALLENGE'
        }
      });
      const result = await guard.canActivate(executionContext);
      expect(result).toBeTruthy();
    });
  });
});
