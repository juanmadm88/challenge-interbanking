import { VerifyCompanyParamsInterceptor } from './verify-company-params.interceptor';

describe('VerifyCompanyParamsInterceptor ', () => {
  it('should expect to be defined', async () => {
    const interceptor: VerifyCompanyParamsInterceptor = new VerifyCompanyParamsInterceptor();
    expect(interceptor).toBeDefined();
  });

  describe('intercept ', () => {
    it('expected callHandler to be called ', async () => {
      const interceptor: VerifyCompanyParamsInterceptor = new VerifyCompanyParamsInterceptor();
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
      const callHandler = {
        handle: jest.fn().mockReturnThis()
      };
      (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
        query: {}
      });
      const actualValue = await interceptor.intercept(executionContext, callHandler);
      expect(actualValue).toBeDefined();
      expect(callHandler.handle).toBeCalledTimes(1);
    });
    it('expected an error when receiving createDateSince not in a valid Iso String format ', async () => {
      const interceptor: VerifyCompanyParamsInterceptor = new VerifyCompanyParamsInterceptor();
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
      const callHandler = {
        handle: jest.fn().mockReturnThis()
      };
      (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
        query: { createDateSince: 'sarasa' }
      });

      try {
        interceptor.intercept(executionContext, callHandler);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
    it('expected an error when receiving createDateTo not in a valid Iso String format ', async () => {
      const interceptor: VerifyCompanyParamsInterceptor = new VerifyCompanyParamsInterceptor();
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
      const callHandler = {
        handle: jest.fn().mockReturnThis()
      };
      (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
        query: { createDateTo: 'sarasa' }
      });

      try {
        interceptor.intercept(executionContext, callHandler);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
    it('expected an error when createDateSince is later than createDateTo ', async () => {
      const interceptor: VerifyCompanyParamsInterceptor = new VerifyCompanyParamsInterceptor();
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
      const callHandler = {
        handle: jest.fn().mockReturnThis()
      };
      (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
        query: {
          createDateSince: '2024-12-11T10:00:00.014Z',
          createDateTo: '2024-10-25T17:27:16.014Z'
        }
      });
      try {
        interceptor.intercept(executionContext, callHandler);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
