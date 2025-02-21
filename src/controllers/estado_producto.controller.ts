import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { EstadoProductoService } from 'src/services/estado_producto.service';
import { Response } from 'express';
import { EstadoProducto } from 'src/models/estado_producto.entity';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('estado_producto')
export class EstadoProductoController {
    constructor(private readonly estadoProductoService: EstadoProductoService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosEstadosProducto(@Res() response: Response) {
        try {
            const estadoProductoData = await this.estadoProductoService.buscarTodosEstadosProducto();
            response.status(HttpStatus.OK);
            response.json({ Data: estadoProductoData, Message: 'Estado producto cargado exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnEstadoProducto(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoProductoData = await this.estadoProductoService.buscarUnEstadoProducto(+id);
            if (estadoProductoData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: estadoProductoData, Message: 'Estado producto cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Estado producto no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postEstadoProducto(@Res() response: Response, @Body() body: Partial<EstadoProducto>) {
        try {
            const estadoProductoData = await this.estadoProductoService.crearEstadoProducto(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: estadoProductoData, Message: 'Estado producto creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el estado del producto.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putEstadoProducto(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<EstadoProducto>) {
        try {
            const estadoProductoCreado = await this.estadoProductoService.buscarUnEstadoProducto(+id);
            if (estadoProductoCreado != null) {
                const estadoProductoData = await this.estadoProductoService.actualizarEstadoProducto(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: estadoProductoData, Message: 'El estado del producto fue actualizado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El estado producto no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteEstadoProducto(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoProductoCreado = await this.estadoProductoService.buscarUnEstadoProducto(+id);
            if (estadoProductoCreado != null) {
                const estadoProductoData = await this.estadoProductoService.inactivarEstadoProducto(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: estadoProductoData, Message: 'El estado producto fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El estado producto no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
