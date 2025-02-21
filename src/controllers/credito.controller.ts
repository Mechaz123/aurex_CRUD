import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';
import { Credito } from 'src/models/credito.entity';
import { CreditoService } from 'src/services/credito.service';

@Controller('credito')
export class CreditoController {
    constructor(private readonly creditoService: CreditoService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosCreditos(@Res() response: Response) {
        try {
            const creditoData = await this.creditoService.buscarTodosCreditos();
            response.status(HttpStatus.OK);
            response.json({ Data: creditoData, Message: 'Creditos cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnCredito(@Res() response: Response, @Param('id') id: string) {
        try {
            const creditoData = await this.creditoService.buscarUnCredito(+id);
            if (creditoData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: creditoData, Message: 'Credito cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credito no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postCredito(@Res() response: Response, @Body() body: Credito) {
        try {
            const creditoData = await this.creditoService.crearCredito(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: creditoData, Message: 'Credito creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el credito.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putCredito(@Res() response: Response, @Param('id') id: string, @Body() body: Credito) {
        try {
            const creditoCreado = await this.creditoService.buscarUnCredito(+id);
            if (creditoCreado != null) {
                const creditoData = await this.creditoService.actualizarCredito(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: creditoData, Message: 'Credito actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El Credito no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteCredito(@Res() response: Response, @Param('id') id: string) {
        try {
            const creditoCreado = await this.creditoService.buscarUnCredito(+id);
            if (creditoCreado != null) {
                const creditoData = await this.creditoService.inactivarCredito(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: creditoData, Message: 'El credito fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El credito no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
