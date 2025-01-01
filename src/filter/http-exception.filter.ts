import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const error: any = exception instanceof HttpException ? exception.getResponse() : new InternalServerErrorException(exception.message);
    const uniqueId = request.headers['unique-trace-id'];
    this.logger.log({
      level: 'error',
      message: 'An Error occurred ',
      method: this.catch.name,
      err: error,
      'unique-trace-id': uniqueId
    });
    response.status(status).json({ error, uniqueId });
  }
}
