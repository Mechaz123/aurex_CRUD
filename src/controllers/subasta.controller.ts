import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { SubastaService } from 'src/services/subasta.service';
import { Response } from 'express';
import { Subasta } from 'src/models/subasta.entity';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('subasta')
export class SubastaController {
    constructor(private readonly subastaService: SubastaService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodasSubastas(@Res() response: Response) {
        try {
            const subastaData = await this.subastaService.buscarTodosSubasta();
            response.status(HttpStatus.OK);
            response.json({ Data: subastaData, Message: 'Subastas cargadas exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnaSubasta(@Res() response: Response, @Param('id') id: string) {
        try {
            const subastaData = await this.subastaService.buscarUnaSubasta(+id);
            if (subastaData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: subastaData, Message: 'Subasta cargada correctamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Subasta no encontrada.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postSubasta(@Res() response: Response, @Body() body: Partial<Subasta>) {
        try {
            const subastaData = await this.subastaService.crearSubasta(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: subastaData, Message: 'Subasta creada exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear la subasta.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putSubasta(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<Subasta>) {
        try {
            const subastaCreada = await this.subastaService.buscarUnaSubasta(+id);
            if (subastaCreada != null) {
                const subastaData = await this.subastaService.actualizarSubasta(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: subastaData, Message: 'Subasta actualizada exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'La subasta no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
