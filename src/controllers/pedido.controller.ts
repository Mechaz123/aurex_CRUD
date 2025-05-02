import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { PedidoService } from 'src/services/pedido.service';
import { Response } from 'express';
import { Pedido } from 'src/models/pedido.entity';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('pedido')
export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosPedidos(@Res() response: Response) {
        try {
            const pedidoData = await this.pedidoService.buscarTodosPedidos();
            response.status(HttpStatus.OK);
            response.json({ Data: pedidoData, Message: 'Pedidos cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnPedido(@Res() response: Response, @Param('id') id: string) {
        try {
            const pedidoData = await this.pedidoService.buscarUnPedido(+id);
            if (pedidoData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: pedidoData, Message: 'Pedido cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Pedido no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postPedido(@Res() response: Response, @Body() body: Partial<Pedido>) {
        try {
            const pedidoData = await this.pedidoService.crearPedido(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: pedidoData, Message: 'Pedido creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el pedido.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putPedido(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<Pedido>) {
        try {
            const pedidoCreado = await this.pedidoService.buscarUnPedido(+id);
            if (pedidoCreado != null) {
                const pedidoData = await this.pedidoService.actualizarPedido(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: pedidoData, Message: 'Pedido actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El pedido no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
