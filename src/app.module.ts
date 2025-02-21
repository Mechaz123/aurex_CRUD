import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EstadoUsuario } from './models/estado_usuario.entity';
import { Rol } from './models/rol.entity';
import { Permiso } from './models/permiso.entity';
import { Usuario } from './models/usuario.entity';
import { UsuarioRol } from './models/usuario_rol.entity';
import { RolPermiso } from './models/rol_permiso.entity';
import { Categoria } from './models/categoria.entity';
import { EstadoProducto } from './models/estado_producto.entity';
import { Producto } from './models/producto.entity';
import { EstadoSubasta } from './models/estado_subasta.entity';
import { Subasta } from './models/subasta.entity';
import { Puja } from './models/puja.entity';
import { EstadoPedido } from './models/estado_pedido.entity';
import { Pedido } from './models/pedido.entity';
import { DetallePedido } from './models/detalle_pedido.entity';
import { EstadoIntercambio } from './models/estado_intercambio.entity';
import { HistorialIntercambio } from './models/historial_intercambio.entity';
import { Intercambio } from './models/intercambio.entity';
import { Credito } from './models/credito.entity';
import { CreditoBloqueado } from './models/credito_bloqueado.entity';
import { HistorialTransaccion } from './models/historial_transaccion.entity';
import { AutenticacionController } from './controllers/autenticacion.controller';
import { EstadoUsuarioController } from './controllers/estado_usuario.controller';
import { RolController } from './controllers/rol.controller';
import { PermisoController } from './controllers/permiso.controller';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioRolController } from './controllers/usuario_rol.controller';
import { RolPermisoController } from './controllers/rol_permiso.controller';
import { CategoriaController } from './controllers/categoria.controller';
import { EstadoProductoController } from './controllers/estado_producto.controller';
import { ProductoController } from './controllers/producto.controller';
import { EstadoSubastaController } from './controllers/estado_subasta.controller';
import { SubastaController } from './controllers/subasta.controller';
import { PujaController } from './controllers/puja.controller';
import { EstadoPedidoController } from './controllers/estado_pedido.controller';
import { PedidoController } from './controllers/pedido.controller';
import { DetallePedidoController } from './controllers/detalle_pedido.controller';
import { EstadoIntercambioController } from './controllers/estado_intercambio.controller';
import { HistorialIntercambioController } from './controllers/historial_intercambio.controller';
import { IntercambioController } from './controllers/intercambio.controller';
import { CreditoController } from './controllers/credito.controller';
import { CreditoBloqueadoController } from './controllers/credito_bloqueado.controller';
import { HistorialTransaccionController } from './controllers/historial_transaccion.controller';
import { AutenticacionService } from './services/autenticacion.service';
import { EstadoUsuarioService } from './services/estado_usuario.service';
import { RolService } from './services/rol.service';
import { PermisoService } from './services/permiso.service';
import { UsuarioService } from './services/usuario.service';
import { UsuarioRolService } from './services/usuario_rol.service';
import { RolPermisoService } from './services/rol_permiso.service';
import { CategoriaService } from './services/categoria.service';
import { EstadoProductoService } from './services/estado_producto.service';
import { ProductoService } from './services/producto.service';
import { EstadoSubastaService } from './services/estado_subasta.service';
import { SubastaService } from './services/subasta.service';
import { PujaService } from './services/puja.service';
import { EstadoPedidoService } from './services/estado_pedido.service';
import { PedidoService } from './services/pedido.service';
import { DetallePedidoService } from './services/detalle_pedido.service';
import { EstadoIntercambioService } from './services/estado_intercambio.service';
import { HistorialIntercambioService } from './services/historial_intercambio.service';
import { IntercambioService } from './services/intercambio.service';
import { CreditoService } from './services/credito.service';
import { CreditoBloqueadoService } from './services/credito_bloqueado.service';
import { HistorialTransaccionService } from './services/historial_transaccion.service';

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
          EstadoUsuario,
          Rol,
          Permiso,
          Usuario,
          UsuarioRol,
          RolPermiso,
          Categoria,
          EstadoProducto,
          Producto,
          EstadoSubasta,
          Subasta,
          Puja,
          EstadoPedido,
          Pedido,
          DetallePedido,
          EstadoIntercambio,
          HistorialIntercambio,
          Intercambio,
          Credito,
          CreditoBloqueado,
          HistorialTransaccion
        ],
        synchronize: true,
        timezone: 'Z',
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([
      EstadoUsuario,
      Rol,
      Permiso,
      Usuario,
      UsuarioRol,
      RolPermiso,
      Categoria,
      EstadoProducto,
      Producto,
      EstadoSubasta,
      Subasta,
      Puja,
      EstadoPedido,
      Pedido,
      DetallePedido,
      EstadoIntercambio,
      HistorialIntercambio,
      Intercambio,
      Credito,
      CreditoBloqueado,
      HistorialTransaccion
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [
    AutenticacionController,
    EstadoUsuarioController,
    RolController,
    PermisoController,
    UsuarioController,
    UsuarioRolController,
    RolPermisoController,
    CategoriaController,
    EstadoProductoController,
    ProductoController,
    EstadoSubastaController,
    SubastaController,
    PujaController,
    EstadoPedidoController,
    PedidoController,
    DetallePedidoController,
    EstadoIntercambioController,
    HistorialIntercambioController,
    IntercambioController,
    CreditoController,
    CreditoBloqueadoController,
    HistorialTransaccionController
  ],
  providers: [
    AutenticacionService,
    EstadoUsuarioService,
    RolService,
    PermisoService,
    UsuarioService,
    UsuarioRolService,
    RolPermisoService,
    CategoriaService,
    EstadoProductoService,
    ProductoService,
    EstadoSubastaService,
    SubastaService,
    PujaService,
    EstadoPedidoService,
    PedidoService,
    DetallePedidoService,
    EstadoIntercambioService,
    HistorialIntercambioService,
    IntercambioService,
    CreditoService,
    CreditoBloqueadoService,
    HistorialTransaccionService
  ],
})
export class AppModule { }