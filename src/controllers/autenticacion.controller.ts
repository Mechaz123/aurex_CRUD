import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { EstadoUsuarioService } from 'src/services/estado_usuario.service';
import { Response } from 'express';
import { UsuarioService } from 'src/services/usuario.service';

@Controller('autenticacion')
export class AutenticacionController {
    constructor(
        private readonly estadoUsuarioService: EstadoUsuarioService,
        private readonly usuarioService: UsuarioService
    ) { }

    @Get("/estado_usuario")
    async getTodosEstadosUsuario(@Res() response: Response) {
        try {
            const estadoUsuarioData = await this.estadoUsuarioService.buscarTodosEstadosUsuario();
            response.status(HttpStatus.OK);
            response.json({ Data: estadoUsuarioData, Message: 'Estados de usuario cargados correctamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Get("/usuario/:id")
    async getUnUsuario(@Res() response: Response, @Param('id') id: string) {
        try {
            const usuarioData = await this.usuarioService.buscarUnUsuario(+id);
            if (usuarioData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: usuarioData, Message: 'Usuario cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Usuario no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
