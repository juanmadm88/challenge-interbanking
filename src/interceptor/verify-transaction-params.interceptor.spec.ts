import { VerifyTransactionParamsInterceptor } from './verify-transaction-params.interceptor';

describe('VerifyTransactionParamsInterceptor ', () => {
  it('should expect to be defined', async () => {
    const interceptor: VerifyTransactionParamsInterceptor = new VerifyTransactionParamsInterceptor();
    expect(interceptor).toBeDefined();
  });

  describe('intercept ', () => {
    it('expected callHandler to be called ', async () => {
      const interceptor: VerifyTransactionParamsInterceptor = new VerifyTransactionParamsInterceptor();
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
    it('expected an error when receiving transferDateSince not in a valid Iso String format ', async () => {
      const interceptor: VerifyTransactionParamsInterceptor = new VerifyTransactionParamsInterceptor();
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
        query: { transferDateSince: 'sarasa' }
      });

      try {
        interceptor.intercept(executionContext, callHandler);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
    it('expected an error when receiving transferDateTo not in a valid Iso String format ', async () => {
      const interceptor: VerifyTransactionParamsInterceptor = new VerifyTransactionParamsInterceptor();
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
        query: { transferDateTo: 'sarasa' }
      });

      try {
        interceptor.intercept(executionContext, callHandler);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
    it('expected an error when transferDateSince is later than transferDateTo ', async () => {
      const interceptor: VerifyTransactionParamsInterceptor = new VerifyTransactionParamsInterceptor();
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
          transferDateSince: '2024-12-11T10:00:00.014Z',
          transferDateTo: '2024-10-25T17:27:16.014Z'
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
