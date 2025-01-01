import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.extractAuthFromHeader(request);
  }

  private extractAuthFromHeader(request: Request): boolean {
    const appId: string = request.headers['app_key'];
    if (appId !== this.configService.get<string>('appConfig.auth.secret')) throw new UnauthorizedException();
    return true;
  }
}
