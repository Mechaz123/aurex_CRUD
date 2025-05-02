import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { EstadoSubastaService } from 'src/services/estado_subasta.service';
import { Response } from 'express';
import { EstadoSubasta } from 'src/models/estado_subasta.entity';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('estado_subasta')
export class EstadoSubastaController {
    constructor(private readonly estadoSubastaService: EstadoSubastaService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosEstadosSubasta(@Res() response: Response) {
        try {
            const estadoSubastaData = await this.estadoSubastaService.buscarTodosEstadoSubasta();
            response.status(HttpStatus.OK);
            response.json({ Data: estadoSubastaData, Message: 'Estados de subasta cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnEstadoSubasta(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoSubastaData = await this.estadoSubastaService.buscarUnEstadoSubasta(+id);
            if (estadoSubastaData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: estadoSubastaData, Message: 'Estado de subasta cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Estado de subasta no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postEstadoSubasta(@Res() response: Response, @Body() body: Partial<EstadoSubasta>) {
        try {
            const estadoSubastaData = await this.estadoSubastaService.crearEstadoSubasta(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: estadoSubastaData, Message: 'Estado de subasta creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el estado de subasta.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putEstadoSubasta(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<EstadoSubasta>) {
        try {
            const estadoSubastaCreado = await this.estadoSubastaService.buscarUnEstadoSubasta(+id);
            if (estadoSubastaCreado != null) {
                const estadoSubastaData = await this.estadoSubastaService.actualizarEstadoSubasta(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: estadoSubastaData, Message: 'Estado subasta actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El estado subasta no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteEstadoSubasta(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoSubastaCreado = await this.estadoSubastaService.buscarUnEstadoSubasta(+id);
            if (estadoSubastaCreado != null) {
                const estadoSubastaData = await this.estadoSubastaService.inactivarEstadoSubasta(+id);
                response.status(HttpStatus.OK);
                response.json({ Data:  estadoSubastaData, Message: 'El estado de subasta fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El estado de subasta no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
