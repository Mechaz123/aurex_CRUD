import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Rol } from 'src/models/rol.entity';
import { RolService } from 'src/services/rol.service';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('rol')
export class RolController {
    constructor(private readonly rolService: RolService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosRoles(@Res() response: Response) {
        try {
            const rolData = await this.rolService.buscarTodosRoles();
            response.status(HttpStatus.OK);
            response.json({ Data: rolData, Message: 'Roles cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnRol(@Res() response: Response, @Param('id') id: string) {
        try {
            const rolData = await this.rolService.buscarUnRol(+id);
            if (rolData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: rolData, Message: 'Rol cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Rol no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postRol(@Res() response: Response, @Body() body: Rol) {
        try {
            const rolData = await this.rolService.crearRol(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: rolData, Message: 'Rol creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el rol.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putRol(@Res() response: Response, @Param('id') id: string, @Body() body: Rol) {
        try {
            const rolCreado = await this.rolService.buscarUnRol(+id);
            if (rolCreado != null) {
                const rolData = await this.rolService.actualizarRol(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: rolData, Message: 'Rol actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El rol no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteRol(@Res() response: Response, @Param('id') id: string) {
        try {
            const rolCreado = await this.rolService.buscarUnRol(+id);
            if (rolCreado != null) {
                const rolData = await this.rolService.inactivarRol(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: rolData, Message: 'El rol fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El rol no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
