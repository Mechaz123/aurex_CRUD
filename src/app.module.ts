import { Module } from '@nestjs/common';
import { UserStatusController } from './controllers/user_status.controller';

@Module({
  imports: [],
  controllers: [UserStatusController],
})
export class AppModule {}
