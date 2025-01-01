import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
@Injectable()
export class VerifyTransactionParamsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    if (request.query && Object.keys(request.query).length) {
      if (this.validateParams(request.query)) throw new BadRequestException('transferDateSince/transferDateTo must been a valid Iso String format');
      if (this.validateDateFromIsLargerThanDateTo(request.query)) throw new BadRequestException('transferDateSince must be earlier than transferDateTo');
    }
    return next.handle();
  }
  private validateParams(filter: any): boolean {
    if (filter.transferDateSince && isNaN(new Date(filter.transferDateSince).getTime())) return true;
    if (filter.transferDateTo && isNaN(new Date(filter.transferDateTo).getTime())) return true;
    return false;
  }

  private validateDateFromIsLargerThanDateTo(filter: any): boolean {
    return filter.transferDateSince && filter.transferDateTo && filter.transferDateSince > filter.transferDateTo;
  }
}
