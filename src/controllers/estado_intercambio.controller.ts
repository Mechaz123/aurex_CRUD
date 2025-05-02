import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';
import { EstadoIntercambio } from 'src/models/estado_intercambio.entity';
import { EstadoIntercambioService } from 'src/services/estado_intercambio.service';

@Controller('estado_intercambio')
export class EstadoIntercambioController {
    constructor(private readonly estadoIntercambioService: EstadoIntercambioService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosEstadosIntercambio(@Res() response: Response) {
        try {
            const estadoIntercambioData = await this.estadoIntercambioService.buscarTodosEstadosIntercambio();
            response.status(HttpStatus.OK);
            response.json({ Data: estadoIntercambioData, Message: 'Estados intercambio cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnEstadoIntercambio(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoIntercambioData = await this.estadoIntercambioService.buscarUnEstadoIntercambio(+id);
            if (estadoIntercambioData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: estadoIntercambioData, Message: 'Estado intercambio cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Estado intercambio no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postEstadoIntercambio(@Res() response: Response, @Body() body: Partial<EstadoIntercambio>) {
        try {
            const estadoIntercambioData = await this.estadoIntercambioService.crearEstadoIntercambio(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: estadoIntercambioData, Message: 'Estado intercambio creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el estado de intercambio.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putEstadoIntercambio(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<EstadoIntercambio>) {
        try {
            const estadoIntercambioCreado = await this.estadoIntercambioService.buscarUnEstadoIntercambio(+id);
            if (estadoIntercambioCreado != null) {
                const estadoIntercambioData = await this.estadoIntercambioService.actualizarEstadoIntercambio(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: estadoIntercambioData, Message: 'Estado intercambio actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Estado intercambio no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteEstadoIntercambio(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoIntercambioCreado = await this.estadoIntercambioService.buscarUnEstadoIntercambio(+id)
            if (estadoIntercambioCreado != null) {
                const estadoIntercambioData = await this.estadoIntercambioService.inactivarEstadoIntercambio(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: estadoIntercambioData, Message: 'Estado intercambio fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Estado intercambio no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
