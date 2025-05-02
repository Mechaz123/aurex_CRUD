import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';
import { HistorialTransaccion } from 'src/models/historial_transaccion.entity';
import { HistorialTransaccionService } from 'src/services/historial_transaccion.service';

@Controller('historial_transaccion')
export class HistorialTransaccionController {
    constructor(private readonly historialTransaccionService: HistorialTransaccionService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosHistorialesTransaccion(@Res() response: Response) {
        try {
            const historialTransaccionData = await this.historialTransaccionService.buscarTodosHistorialesTransaccion();
            response.status(HttpStatus.OK);
            response.json({ Data: historialTransaccionData, Message: 'Historiales de transacciones cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnHistorialTransaccion(@Res() response: Response, @Param('id') id: string) {
        try {
            const historialTransaccionData = await this.historialTransaccionService.buscarUnHistorialTransaccion(+id);
            if (historialTransaccionData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: historialTransaccionData, Message: 'Historial de transaccion cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Historial de transaccion no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postHistorialTransaccion(@Res() response: Response, @Body() body: HistorialTransaccion) {
        try {
            const historialTransaccionData = await this.historialTransaccionService.crearHistorialTransaccion(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: historialTransaccionData, Message: 'Historial transaccion creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el historial de transaccion.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putHistorialTransaccion(@Res() response: Response, @Param('id') id: string, @Body() body: HistorialTransaccion) {
        try {
            const historialTransaccionCreado = await this.historialTransaccionService.buscarUnHistorialTransaccion(+id);
            if (historialTransaccionCreado != null) {
                const historialTransaccionData = await this.historialTransaccionService.actualizarHistorialTransaccion(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: historialTransaccionData, Message: 'El historial transaccion fue actualizado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El historial de transaccion no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteHistorialTransaccion(@Res() response: Response, @Param('id') id: string) {
        try {
            const historialTransaccionCreado = await this.historialTransaccionService.buscarUnHistorialTransaccion(+id);
            if (historialTransaccionCreado != null) {
                const historialTransaccionData = await this.historialTransaccionService.inactivarHistorialTransaccion(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: historialTransaccionData, Message: 'El historial de transaccion fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El historial de transaccion no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
