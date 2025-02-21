import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { EstadoUsuarioService } from 'src/services/estado_usuario.service';
import { EstadoUsuario } from 'src/models/estado_usuario.entity';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('estado_usuario')
export class EstadoUsuarioController {
    constructor(private readonly estadoUsuarioService: EstadoUsuarioService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosEstadosUsuario(@Res() response: Response) {
        try {
            const estadoUsuarioData = await this.estadoUsuarioService.buscarTodosEstadosUsuario();
            response.status(HttpStatus.OK);
            response.json({ Data: estadoUsuarioData, Message: 'Estados de usuario cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnEstadoUsuario(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoUsuarioData = await this.estadoUsuarioService.buscarUnEstadoUsuario(+id);
            if (estadoUsuarioData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: estadoUsuarioData, Message: 'Estado de usuario cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Estado de usuario no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postEstadoUsuario(@Res() response: Response, @Body() body: Partial<EstadoUsuario>) {
        try {
            const estadoUsuarioData = await this.estadoUsuarioService.crearEstadoUsuario(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: estadoUsuarioData, Message: 'Estado de usuario creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se puede crear el estado de usuario.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putEstadoUsuario(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<EstadoUsuario>) {
        try {
            const estadoUsuarioCreado = await this.estadoUsuarioService.buscarUnEstadoUsuario(+id);
            if (estadoUsuarioCreado != null) {
                const estadoUsuarioData = await this.estadoUsuarioService.actualizarEstadoUsuario(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: estadoUsuarioData, Message: 'Estado de usuario actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El estado de usuario no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteEstadoUsuario(@Res() response: Response, @Param('id') id: string) {
        try {
            const estadoUsuarioCreado = await this.estadoUsuarioService.buscarUnEstadoUsuario(+id);
            if (estadoUsuarioCreado != null) {
                const estadoUsuarioData = await this.estadoUsuarioService.inactivarEstadoUsuario(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: estadoUsuarioData, Message: 'El estado de usuario fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El estado de usuario no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
