import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AutenticacionGuard } from 'src/guards/autenticacion.guard';
import { Categoria } from 'src/models/categoria.entity';
import { CategoriaService } from 'src/services/categoria.service';

@Controller('categoria')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    @UseGuards(AutenticacionGuard)
    @Get("/")
    async getTodasCategorias(@Res() response: Response) {
        try {
            const categoriaData = await this.categoriaService.buscarTodasCategorias();
            response.status(HttpStatus.OK);
            response.json({ Data: categoriaData, Message: 'Categorias cargadas exitosamente.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Get("/:id")
    async getUnaCategoria(@Res() response: Response, @Param('id') id: string) {
        try {
            const categoriaData = await this.categoriaService.buscarUnaCategoria(+id);
            if (categoriaData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: categoriaData, Message: 'Categoria cargada exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Categoria no encontrada.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Post("/")
    async postCategoria(@Res() response: Response, @Body() body: Categoria) {
        try {
            const categoriaData = await this.categoriaService.crearCategoria(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: categoriaData, Message: 'Categoria creada exitosamente.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'El body contiene errores, no se pudo crear la categoria.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Put("/:id")
    async putCategoria(@Res() response: Response, @Param('id') id: string, @Body() body: Categoria) {
        try {
            const categoriaCreada = await this.categoriaService.buscarUnaCategoria(+id);
            if (categoriaCreada != null) {
                const categoriaData = await this.categoriaService.actualizarCategoria(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: categoriaData, Message: 'Categoria actualizada exitosamente.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'La categoria no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AutenticacionGuard)
    @Delete("/:id")
    async deleteCategoria(@Res() response: Response, @Param('id') id: string) {
        try {
            const categoriaCreada = await this.categoriaService.buscarUnaCategoria(+id);
            if (categoriaCreada != null) {
                const categoriaData = await this.categoriaService.inactivarCategoria(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: categoriaData, Message: 'La categoria fue inactivada.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'La categoria no existe.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Error interno del servidor.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
