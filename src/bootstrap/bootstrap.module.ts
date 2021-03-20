import { Module } from '@nestjs/common';
import { IAuthModuleOptions, PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import AppConfig from '../config/app.config';
import { MulterModule } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      load: [AppConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<ConnectionOptions>('database');
      },
      inject: [ConfigService],
    }),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<IAuthModuleOptions>('passport');
      },
      inject: [ConfigService],
    }),
    /*JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<JwtModuleOptions>('jwt');
      },
      inject: [ConfigService],
    }),*/
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return configService.get<MulterOptions>('multer');
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [ConfigModule, TypeOrmModule, PassportModule, MulterModule],
})
export class BootstrapModule {}
