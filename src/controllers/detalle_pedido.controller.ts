import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { DetallePedidoService } from 'src/services/detalle_pedido.service';
import { Response } from 'express';
import { DetallePedido } from 'src/models/detalle_pedido.entity';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('detalle_pedido')
export class DetallePedidoController {
    constructor(private readonly detallePedidoService: DetallePedidoService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosDetallePedido(@Res() response: Response) {
        try {
            const detallePedidoData = await this.detallePedidoService.buscarTodosDetallePedidos();
            response.status(HttpStatus.OK);
            response.json({ Data: detallePedidoData, Message: 'Detalle pedidos cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getOneDetallePedido(@Res() response: Response, @Param('id') id: string) {
        try {
            const detallePedidoData = await this.detallePedidoService.buscarUnDetallePedido(+id);
            if (detallePedidoData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: detallePedidoData, Message: 'Detalle pedido cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Detalle pedido no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postDetallePedido(@Res() response: Response, @Body() body: DetallePedido) {
        try {
            const detallePedidoData = await this.detallePedidoService.crearDetallePedido(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: detallePedidoData, Message: 'Detalle pedido creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el detalle pedido.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putDetallePedido(@Res() response: Response, @Param('id') id: string, @Body() body: DetallePedido) {
        try {
            const detallePedidoCreado = await this.detallePedidoService.buscarUnDetallePedido(+id);
            if (detallePedidoCreado != null) {
                const detallePedidoData = await this.detallePedidoService.actualizarDetallePedido(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: detallePedidoData, Message: 'Detalle pedido actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Detalle pedido no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteDetallePedido(@Res() response: Response, @Param('id') id: string) {
        try {
            const detallePedidoCreado = await this.detallePedidoService.buscarUnDetallePedido(+id);
            if (detallePedidoCreado != null) {
                const detallePedidoData = await this.detallePedidoService.inactivarDetallePedido(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: detallePedidoData, Message: 'El detalle pedido fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El detalle pedido no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
