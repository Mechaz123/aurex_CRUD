import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';
import { CreditoBloqueado } from 'src/models/credito_bloqueado.entity';
import { CreditoBloqueadoService } from 'src/services/credito_bloqueado.service';

@Controller('credito_bloqueado')
export class CreditoBloqueadoController {
    constructor(private readonly creditoBloqueadoService: CreditoBloqueadoService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosCreditoBloqueado(@Res() response: Response) {
        try {
            const creditoBloqueadoData = await this.creditoBloqueadoService.buscarTodosCreditosBloqueados();
            response.status(HttpStatus.OK);
            response.json({ Data: creditoBloqueadoData, Message: 'Creditos bloqueados cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnCreditoBloqueado(@Res() response: Response, @Param('id') id: string) {
        try {
            const creditoBloqueadoData = await this.creditoBloqueadoService.buscarUnCreditoBloqueado(+id);
            if (creditoBloqueadoData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: creditoBloqueadoData, Message: 'Credito bloqueado cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credito bloqueado no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postCreditoBloqueado(@Res() response: Response, @Body() body: CreditoBloqueado) {
        try {
            const creditoBloqueadoData = await this.creditoBloqueadoService.crearCreditoBloqueado(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: creditoBloqueadoData, Message: 'Credito bloqueado creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el credito bloqueado.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putCreditoBloqueado(@Res() response: Response, @Param('id') id: string, @Body() body: CreditoBloqueado) {
        try {
            const creditoBloqueadoCreado = await this.creditoBloqueadoService.buscarUnCreditoBloqueado(+id);
            if (creditoBloqueadoCreado != null) {
                const creditoBloqueadoData = await this.creditoBloqueadoService.actualizarCreditoBloqueado(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: creditoBloqueadoData, Message: 'Credito bloqueado actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credito bloqueado no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteCreditoBloqueado(@Res() response: Response, @Param('id') id: string) {
        try {
            const creditoBloqueadoCreado = await this.creditoBloqueadoService.buscarUnCreditoBloqueado(+id);
            if (creditoBloqueadoCreado != null) {
                const creditoBloqueadoData = await this.creditoBloqueadoService.inactivarCreditoBloqueado(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: creditoBloqueadoData, Message: 'Credito bloqueado fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credito bloqueado no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
