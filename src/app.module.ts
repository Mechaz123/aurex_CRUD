import { Module } from '@nestjs/common';
import { UserStatusController } from './controllers/user_status.controller';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';

@Module({
  imports: [],
  controllers: [
    UserStatusController, 
    RoleController,
    PermissionController],
})
export class AppModule {}
