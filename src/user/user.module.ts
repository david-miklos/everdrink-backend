import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { BootstrapModule } from "../bootstrap/bootstrap.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), BootstrapModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
