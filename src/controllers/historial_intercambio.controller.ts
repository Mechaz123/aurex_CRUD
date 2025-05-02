import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';
import { HistorialIntercambio } from 'src/models/historial_intercambio.entity';
import { HistorialIntercambioService } from 'src/services/historial_intercambio.service';

@Controller('historial_intercambio')
export class HistorialIntercambioController {
    constructor(private readonly historialIntercambioService: HistorialIntercambioService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosHistorialIntercambio(@Res() response: Response) {
        try {
            const historialIntercambioData = await this.historialIntercambioService.buscarTodosHistorialIntercambios();
            response.status(HttpStatus.OK);
            response.json({ Data: historialIntercambioData, Message: 'Historial intercambios cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnHistorialIntercambio(@Res() response: Response, @Param('id') id: string) {
        try {
            const historialIntercambioData = await this.historialIntercambioService.buscarUnHistorialIntercambio(+id);
            if (historialIntercambioData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: historialIntercambioData, Message: 'Historial intercambio cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Historial intercambio no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postHistorialIntercambio(@Res() response: Response, @Body() body: HistorialIntercambio) {
        try {
            const historialIntercambioData = await this.historialIntercambioService.crearHistorialIntercambio(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: historialIntercambioData, Message: 'Historial intercambio creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el historial de intercambio.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putHistorialIntercambio(@Res() response: Response, @Param('id') id: string, @Body() body: HistorialIntercambio) {
        try {
            const historialIntercambioCreado = await this.historialIntercambioService.buscarUnHistorialIntercambio(+id);
            if (historialIntercambioCreado != null) {
                const historialIntercambioData = await this.historialIntercambioService.actualizarHistorialIntercambio(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: historialIntercambioData, Message: 'Historial intercambio actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Historial intercambio no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteHistorialIntercambio(@Res() response: Response, @Param('id') id: string) {
        try {
            const historialIntercambioCreado = await this.historialIntercambioService.buscarUnHistorialIntercambio(+id);
            if (historialIntercambioCreado != null) {
                const historialIntercambioData = await this.historialIntercambioService.inactivarHistorialIntercambio(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: historialIntercambioData, Message: 'El historial intercambio fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Historial intercambio no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
