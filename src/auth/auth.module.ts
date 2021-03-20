import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt.guard';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: 'secretkey', //process.env.SECRETKEY
      signOptions: {
        expiresIn: 3600, //process.env.EXPIRESIN
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthService,
    JwtStrategy,
  ],
  //exports: [PassportModule, JwtModule],
})
export class AuthModule {}
