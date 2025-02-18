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
import { AuctionStatus } from './models/auction_status.entity';
import { AuctionStatusService } from './services/auction_status.service';
import { AuctionStatusController } from './controllers/auction_status.controller';
import { Auction } from './models/auction.entity';
import { AuctionController } from './controllers/auction.controller';
import { AuctionService } from './services/auction.service';
import { Bid } from './models/bid.entity';
import { BidController } from './controllers/bid.controller';
import { BidService } from './services/bid.service';
import { OrderStatus } from './models/order_status.entity';
import { OrderStatusController } from './controllers/order_status.controller';
import { OrderStatusService } from './services/order_status.service';
import { Order } from './models/order.entity';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderDetail } from './models/order_detail.entity';
import { OrderDetailController } from './controllers/order_detail.controller';
import { OrderDetailService } from './services/order_detail.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { ExchangeStatus } from './models/exchange_status.entity';
import { ExchangeHistory } from './models/exchange_history.entity';
import { Exchange } from './models/exchange.entity';
import { Credit } from './models/credit.entity';
import { CreditBlock } from './models/credit_block.entity';
import { TransactionHistory } from './models/transaction_history.entity';
import { ExchangeStatusController } from './controllers/exchange_status.controller';
import { ExchangeStatusService } from './services/exchange_status.service';
import { ExchangeHistoryController } from './controllers/exchange_history.controller';
import { ExchangeHistoryService } from './services/exchange_history.service';
import { ExchangeController } from './controllers/exchange.controller';
import { ExchangeService } from './services/exchange.service';
import { CreditController } from './controllers/credit.controller';
import { CreditService } from './services/credit.service';
import { CreditBlockController } from './controllers/credit_block.controller';
import { CreditBlockService } from './services/credit_block.service';
import { TransactionHistoryController } from './controllers/transaction_history.controller';
import { TransactionHistoryService } from './services/transaction_history.service';

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
        entities: [
          UserStatus,
          Role,
          Permission,
          User,
          UserRole,
          RolePermission,
          Category,
          ProductStatus,
          Product,
          AuctionStatus,
          Auction,
          Bid,
          OrderStatus,
          Order,
          OrderDetail,
          ExchangeStatus,
          ExchangeHistory,
          Exchange,
          Credit,
          CreditBlock,
          TransactionHistory
        ],
        synchronize: true,
        timezone: 'Z',
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([
      UserStatus,
      Role,
      Permission,
      User,
      UserRole,
      RolePermission,
      Category,
      ProductStatus,
      Product,
      AuctionStatus,
      Auction,
      Bid,
      OrderStatus,
      Order,
      OrderDetail,
      ExchangeStatus,
      ExchangeHistory,
      Exchange,
      Credit,
      CreditBlock,
      TransactionHistory
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [
    AuthenticationController,
    UserStatusController,
    RoleController,
    PermissionController,
    UserController,
    UserRoleController,
    RolePermissionController,
    CategoryController,
    ProductStatusController,
    ProductController,
    AuctionStatusController,
    AuctionController,
    BidController,
    OrderStatusController,
    OrderController,
    OrderDetailController,
    ExchangeStatusController,
    ExchangeHistoryController,
    ExchangeController,
    CreditController,
    CreditBlockController,
    TransactionHistoryController
  ],
  providers: [
    AuthenticationService,
    UserStatusService,
    RoleService,
    PermissionService,
    UserService,
    UserRoleService,
    RolePermissionService,
    CategoryService,
    ProductStatusService,
    ProductService,
    AuctionStatusService,
    AuctionService,
    BidService,
    OrderStatusService,
    OrderService,
    OrderDetailService,
    ExchangeStatusService,
    ExchangeHistoryService,
    ExchangeService,
    CreditService,
    CreditBlockService,
    TransactionHistoryService
  ],
})
export class AppModule { }