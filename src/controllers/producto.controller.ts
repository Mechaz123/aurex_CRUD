import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ProductoService } from 'src/services/producto.service';
import { Response } from 'express';
import { Producto } from 'src/models/producto.entity';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('producto')
export class ProductoController {
    constructor(private readonly productoService: ProductoService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosProductos(@Res() response: Response) {
        try {
            const productoData = await this.productoService.buscarTodosProductos();
            response.status(HttpStatus.OK);
            response.json({ Data: productoData, Message: 'Productos cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnProducto(@Res() response: Response, @Param('id') id: string) {
        try {
            const productoData = await this.productoService.buscarUnProducto(+id);
            if (productoData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: productoData, Message: 'Producto cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Producto no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postProducto(@Res() response: Response, @Body() body: Producto) {
        try {
            const productoData = await this.productoService.crearProducto(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: productoData, Message: 'Producto creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el producto.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putProducto(@Res() response: Response, @Param('id') id: string, @Body() body: Producto) {
        try {
            const productoCreado = await this.productoService.buscarUnProducto(+id);
            if (productoCreado != null) {
                const productoData = await this.productoService.actualizarProducto(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: productoData, Message: 'Producto actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Producto no existente.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
