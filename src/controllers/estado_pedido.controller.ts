import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { EstadoPedidoService } from 'src/services/estado_pedido.service';
import { Response } from 'express';
import { EstadoPedido } from 'src/models/estado_pedido.entity';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('estado_pedido')
export class EstadoPedidoController {
    constructor(private readonly estadoPedidoService: EstadoPedidoService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosEstadosPedido(@Res() response: Response) {
        try {
            const estadoPedidoData = await this.estadoPedidoService.buscarTodosEstadosPedido();
            response.status(HttpStatus.OK);
            response.json({ Data: estadoPedidoData, Message: 'Estados pedido cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnEstadoPedido(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoPedidoData = await this.estadoPedidoService.buscarUnEstadoPedido(+id);
            if (estadoPedidoData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: estadoPedidoData, Message: 'Estado pedido cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Estado pedido no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postEstadoPedido(@Res() response: Response, @Body() body: Partial<EstadoPedido>) {
        try {
            const estadoPedidoData = await this.estadoPedidoService.crearEstadoPedido(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: estadoPedidoData, Message: 'Estado pedido creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el estado de pedido.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putEstadoPedido(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<EstadoPedido>) {
        try {
            const estadoPedidoCreado = await this.estadoPedidoService.buscarUnEstadoPedido(+id);
            if (estadoPedidoCreado != null) {
                const estadoPedidoData = await this.estadoPedidoService.actualizarEstadoPedido(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: estadoPedidoData, Message: 'Estado pedido actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Estado pedido no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteEstadoPedido(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoPedidoCreado = await this.estadoPedidoService.buscarUnEstadoPedido(+id)
            if (estadoPedidoCreado != null) {
                const estadoPedidoData = await this.estadoPedidoService.inactivarEstadoPedido(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: estadoPedidoData, Message: 'El estado pedido fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Estado pedido no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
