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
import { UserStatusService } from './services/user_status.service';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRole } from './models/user_role.entity';
import { UserRoleController } from './controllers/user_role.controller';
import { UserRoleService } from './services/user_role.service';
import { RolePermission } from './models/role_permission.entity';
import { RolePermissionController } from './controllers/role_permission.controller';
import { RolePermissionService } from './services/role_permission.service';
import { Category } from './models/category.entity';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { ProductStatus } from './models/product_status.entity';
import { ProductStatusService } from './services/product_status.service';
import { ProductStatusController } from './controllers/product_status.controller';
import { Product } from './models/product.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TransactionStatus } from './models/transaction_status.entity';
import { TransactionStatusService } from './services/transaction_status.service';
import { TransactionStatusController } from './controllers/transaction_status.controller';
import { Transaction } from './models/transaction.entity';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';

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
        entities: [UserStatus, Role, Permission, User, UserRole, RolePermission, Category, ProductStatus, Product, TransactionStatus, Transaction],
        synchronize: true,
        timezone: 'Z',
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([UserStatus, Role, Permission, User, UserRole, RolePermission, Category, ProductStatus, Product, TransactionStatus, Transaction]),
  ],
  controllers: [
    UserStatusController,
    RoleController,
    PermissionController,
    UserController,
    UserRoleController,
    RolePermissionController,
    CategoryController,
    ProductStatusController,
    ProductController,
    TransactionStatusController,
    TransactionController
  ],
  providers: [
    UserStatusService,
    RoleService,
    PermissionService,
    UserService,
    UserRoleService,
    RolePermissionService,
    CategoryService,
    ProductStatusService,
    ProductService,
    TransactionStatusService,
    TransactionService,
  ],
})
export class AppModule { }