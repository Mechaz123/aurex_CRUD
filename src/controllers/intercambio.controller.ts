import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';
import { Intercambio } from 'src/models/intercambio.entity';
import { IntercambioService } from 'src/services/intercambio.service';

@Controller('intercambio')
export class IntercambioController {
    constructor(private readonly intercambioService: IntercambioService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosIntercambio(@Res() response: Response) {
        try {
            const intercambioData = await this.intercambioService.buscarTodosIntercambios();
            response.status(HttpStatus.OK);
            response.json({ Data: intercambioData, Message: 'Intercambios cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnIntercambio(@Res() response: Response, @Param('id') id: string) {
        try {
            const intercambioData = await this.intercambioService.buscarUnIntercambio(+id);
            if (intercambioData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: intercambioData, Message: 'Intercambio cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Intercambio no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postIntercambio(@Res() response: Response, @Body() body: Intercambio) {
        try {
            const intercambioData = await this.intercambioService.crearIntercambio(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: intercambioData, Message: 'Intercambio creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el intercambio.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putIntercambio(@Res() response: Response, @Param('id') id: string, @Body() body: Intercambio) {
        try {
            const intercambioCreado = await this.intercambioService.buscarUnIntercambio(+id);
            if (intercambioCreado != null) {
                const intercambioData = await this.intercambioService.actualizarIntercambio(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: intercambioData, Message: 'Intercambio actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El intercambio no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteIntercambio(@Res() response: Response, @Param('id') id: string) {
        try {
            const intercambioCreado = await this.intercambioService.buscarUnIntercambio(+id);
            if (intercambioCreado != null) {
                const intercambioData = await this.intercambioService.inactivarIntercambio(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: intercambioData, Message: 'El intercambio fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El intercambio no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
