import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { PujaService } from 'src/services/puja.service';
import { Response } from 'express';
import { Puja } from 'src/models/puja.entity';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('puja')
export class PujaController {
    constructor(private readonly pujaService: PujaService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodasPujas(@Res() response: Response) {
        try {
            const pujaData = await this.pujaService.buscarTodasPujas();
            response.status(HttpStatus.OK);
            response.json({ Data: pujaData, Message: 'Pujas cargadas correctamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnaPuja(@Res() response: Response, @Param('id') id: string) {
        try {
            const pujaData = await this.pujaService.buscarUnaPuja(+id);
            if (pujaData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: pujaData, Message: 'Puja cargada exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Puja no encontrada.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postPuja(@Res() response: Response, @Body() body: Puja) {
        try {
            const pujaData = await this.pujaService.crearPuja(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: pujaData, Message: 'Puja creada exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear la puja.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putPuja(@Res() response: Response, @Param('id') id: string, @Body() body: Puja) {
        try {
            const pujaCreada = await this.pujaService.buscarUnaPuja(+id);
            if (pujaCreada != null) {
                const pujaData = await this.pujaService.actualizarPuja(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: pujaData, Message: 'Puja actualizada exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'La puja no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deletePuja(@Res() response: Response, @Param('id') id: string) {
        try {
            const pujaCreada = await this.pujaService.buscarUnaPuja(+id);
            if (pujaCreada != null) {
                const pujaData = await this.pujaService.inactivarPuja(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: pujaData, Message: 'La puja fue inactivada.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'La puja no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
