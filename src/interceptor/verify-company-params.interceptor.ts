import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
@Injectable()
export class VerifyCompanyParamsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.query && Object.keys(request.query).length) {
      if (this.validateParams(request.query)) throw new BadRequestException('createDateSince/createDateTo must been a valid Iso String format');
      if (this.validateDateFromIsLargerThanDateTo(request.query)) throw new BadRequestException('createDateSince must be earlier than createDateTo');
    }
    return next.handle();
  }
  private validateParams(filter: any): boolean {
    if (filter.createDateSince && isNaN(new Date(filter.createDateSince).getTime())) return true;
    if (filter.createDateTo && isNaN(new Date(filter.createDateTo).getTime())) return true;
    return false;
  }

  private validateDateFromIsLargerThanDateTo(filter: any): boolean {
    return filter.createDateSince && filter.createDateTo && filter.createDateSince > filter.createDateTo;
  }
}
