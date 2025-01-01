import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './schemas/app.schema';
import { appConfig } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from './utils/utils.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GenerateTraceIdInterceptor } from './interceptor/generate-trace-id.interceptor';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      load: [appConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('appConfig.msyqlConnection.type'),
        host: configService.get<string>('appConfig.msyqlConnection.host'),
        port: configService.get<number>('appConfig.msyqlConnection.port'),
        username: configService.get<string>('appConfig.msyqlConnection.username'),
        password: configService.get<string>('appConfig.msyqlConnection.password'),
        database: configService.get<string>('appConfig.msyqlConnection.database'),
        synchronize: configService.get<boolean>('appConfig.msyqlConnection.synchronize'),
        autoLoadEntities: true,
        logging: configService.get<boolean>('appConfig.msyqlConnection.allowLoggingQueries')
      }),
      inject: [ConfigService]
    }),
    UtilsModule,
    CompanyModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GenerateTraceIdInterceptor
    }
  ]
})
export class AppModule {}
