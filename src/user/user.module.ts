import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, fileFilter } from '../shared/utils';
import { BootstrapModule } from "../bootstrap/bootstrap.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), BootstrapModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
