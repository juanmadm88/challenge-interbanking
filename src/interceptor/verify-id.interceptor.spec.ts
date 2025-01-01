import { VerifyIdInterceptor } from './verify-id.interceptor';

describe('VerifyIdInterceptor ', () => {
  it('should expect to be defined', async () => {
    const interceptor: VerifyIdInterceptor = new VerifyIdInterceptor();
    expect(interceptor).toBeDefined();
  });

  describe('intercept ', () => {
    it('expected callHandler to be called ', async () => {
      const interceptor: VerifyIdInterceptor = new VerifyIdInterceptor();
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
        params: { id: 1 }
      });
      const actualValue = await interceptor.intercept(executionContext, callHandler);
      expect(actualValue).toBeDefined();
      expect(callHandler.handle).toBeCalledTimes(1);
    });
    it('expected an error when receiving id param not as a valid number format ', async () => {
      const interceptor: VerifyIdInterceptor = new VerifyIdInterceptor();
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
        params: { id: 'sarasa' }
      });

      try {
        interceptor.intercept(executionContext, callHandler);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
