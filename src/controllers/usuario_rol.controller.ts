import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UsuarioRolService } from 'src/services/usuario_rol.service';
import { Response } from 'express';
import { UsuarioRol } from 'src/models/usuario_rol.entity';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('usuario_rol')
export class UsuarioRolController {
    constructor(private readonly usuarioRolService: UsuarioRolService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosUsuariosRoles(@Res() response: Response) {
        try {
            const usuarioRolData = await this.usuarioRolService.buscarTodosUsuariosRoles();
            response.status(HttpStatus.OK);
            response.json({ Data: usuarioRolData, Message: 'Usuario-roles cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnUsuarioRol(@Res() response: Response, @Param('id') id: string) {
        try {
            const usuarioRolData = await this.usuarioRolService.buscarUnUsuarioRol(+id);
            if (usuarioRolData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: usuarioRolData, Message: 'Usuario-rol cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Usuario-rol no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postUsuarioRol(@Res() response: Response, @Body() body: Partial<UsuarioRol>) {
        try {
            const usuarioRolData = await this.usuarioRolService.crearUsuarioRol(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: usuarioRolData, Message: 'Usuario-rol creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el usuario-rol.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putUsuarioRol(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<UsuarioRol>) {
        try {
            const usuarioRolCreado = await this.usuarioRolService.buscarUnUsuarioRol(+id);
            if (usuarioRolCreado != null) {
                const usuarioRolData = await this.usuarioRolService.actualizarUsuarioRol(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: usuarioRolData, Message: 'Usuario-rol actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El usuario-rol no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteUsuarioRol(@Res() response: Response, @Param('id') id: string) {
        try {
            const usuarioRolCreado = await this.usuarioRolService.buscarUnUsuarioRol(+id);
            if (usuarioRolCreado != null) {
                const usuarioRolData = await this.usuarioRolService.inactivarUsuarioRol(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: usuarioRolData, Message: 'El usuario-rol fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El usuario-rol no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
