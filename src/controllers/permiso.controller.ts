import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Permiso } from 'src/models/permiso.entity';
import { PermisoService } from 'src/services/permiso.service';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';

@Controller('permiso')
export class PermisoController {
    constructor(private readonly permisoService: PermisoService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodosPermisos(@Res() response: Response) {
        try {
            const permisoData = await this.permisoService.buscarTodosPermisos();
            response.status(HttpStatus.OK);
            response.json({ Data: permisoData, Message: 'Permisos cargados exitosamente.', Status: HttpStatus.OK, Success: true })
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnPermiso(@Res() response: Response, @Param('id') id: string) {
        try {
            const permisoData = await this.permisoService.buscarUnPermiso(+id);
            if (permisoData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: permisoData, Message: 'Permiso cargado exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Permiso no encontrado.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postPermiso(@Res() response: Response, @Body() body: Permiso) {
        try {
            const permisoData = await this.permisoService.crearPermiso(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: permisoData, Message: 'Permiso creado exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear el permiso.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putPermiso(@Res() response: Response, @Param('id') id: string, @Body() body: Permiso) {
        try {
            const permisoCreado = await this.permisoService.buscarUnPermiso(+id);
            if (permisoCreado != null) {
                const permisoData = await this.permisoService.actualizarPermiso(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: permisoData, Message: 'Permiso actualizado correctamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El permiso no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deletePermiso(@Res() response: Response, @Param('id') id: string) {
        try {
            const permisoCreado = await this.permisoService.buscarUnPermiso(+id);
            if (permisoCreado != null) {
                const permisoData = await this.permisoService.inactivarPermiso(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: permisoData, Message: 'El permiso fue inactivado.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'El permiso no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response
    }
}
