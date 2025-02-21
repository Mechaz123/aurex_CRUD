import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';
import { RolPermiso } from 'src/models/rol_permiso.entity';
import { RolPermisoService } from 'src/services/rol_permiso.service';

@Controller('rol_permiso')
export class RolPermisoController {
    constructor(private readonly rolPermisoService: RolPermisoService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosRolesPermisos(@Res() response: Response) {
        try {
            const rolPermisoData = await this.rolPermisoService.buscarTodosRolesPermisos();
            response.status(HttpStatus.OK);
            response.json({ Data: rolPermisoData, Message: 'Roles-permisos cargados exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnRolPermiso(@Res() response: Response, @Param('id') id: string) {
        try {
            const rolPermisoData = await this.rolPermisoService.buscarUnRolPermiso(+id);
            if (rolPermisoData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: rolPermisoData, Message: 'Rol-permiso cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Rol-permiso no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postRolPermiso(@Res() response: Response, @Body() body: Partial<RolPermiso>) {
        try {
            const rolPermisoData = await this.rolPermisoService.crearRolPermiso(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: rolPermisoData, Message: 'Rol-permiso creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el rol-permiso.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putRolPermiso(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<RolPermiso>) {
        try {
            const rolPermisoCreado = await this.rolPermisoService.buscarUnRolPermiso(+id);
            if (rolPermisoCreado != null) {
                const rolPermisoData = await this.rolPermisoService.actualizarRolPermiso(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: rolPermisoData, Message: 'Rol-permiso actualizado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El rol-permiso no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteRolPermiso(@Res() response: Response, @Param('id') id: string) {
        try {
            const rolPermisoCreado = await this.rolPermisoService.buscarUnRolPermiso(+id);
            if (rolPermisoCreado != null) {
                const rolPermisoData = await this.rolPermisoService.inactivarRolPermiso(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: rolPermisoData, Message: 'El rol-permiso fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El rol-permiso no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
