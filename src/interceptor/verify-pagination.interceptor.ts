import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
@Injectable()
export class VerifyPaginationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (this.validateParams(request.query)) throw new BadRequestException('Pagination params size/skip must be numeric');
    return next.handle();
  }
  private validateParams(filter: any): boolean {
    if (!filter || !Object.keys(filter).length) return false;
    if (filter.size && isNaN(parseInt(filter.size))) return true;
    if (filter.skip && isNaN(parseInt(filter.skip))) return true;
    return false;
  }
}
