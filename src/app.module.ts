import { Module } from '@nestjs/common';
import { UserStatusController } from './controllers/user_status.controller';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatus } from './models/user_status.entity';
import { User } from './models/user.entity';
import { Role } from './models/role.entity';
import { Permission } from './models/permission.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserStatus, Role, Permission, User],
        synchronize: true,
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [
    UserStatusController, 
    RoleController,
    PermissionController],
})
export class AppModule {}