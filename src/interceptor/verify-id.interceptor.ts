import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
@Injectable()
export class VerifyIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (this.validateId(request.params.id)) throw new BadRequestException('Id must be a numeric one');
    return next.handle();
  }
  private validateId(id: any): boolean {
    return isNaN(id);
  }
}
