import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';
import { Usuario } from 'src/models/usuario.entity';
import { UsuarioService } from 'src/services/usuario.service';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosUsuarios(@Res() response: Response) {
        try {
            const usuarioData = await this.usuarioService.buscarTodosUsuarios();
            response.status(HttpStatus.OK);
            response.json({ Data: usuarioData, Message: 'Usuarios cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
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

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postUsuario(@Res() response: Response, @Body() body: Partial<Usuario>) {
        try {
            const usuarioData = await this.usuarioService.crearUsuario(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: usuarioData, Message: 'Usuario creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el usuario.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putUsuario(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<Usuario>) {
        try {
            const usuarioCreado = await this.usuarioService.buscarUnUsuario(+id);
            if (usuarioCreado != null) {
                const usuarioData = await this.usuarioService.actualizarUsuario(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: usuarioData, Message: 'Usuario actualizado correctamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El usuario no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
