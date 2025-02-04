import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Category } from 'src/models/category.entity';
import { CategoryService } from 'src/services/category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllCategory(@Res() response: Response) {
        try {
            const categoryData = await this.categoryService.findAllCategory();
            response.status(HttpStatus.OK);
            response.json({ Data: categoryData, Message: 'Category loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneCategory(@Res() response: Response, @Param('id') id: string) {
        try {
            const categoryData = await this.categoryService.findOneCategory(+id);
            if (categoryData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: categoryData, Message: 'Category loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Category not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postCategory(@Res() response: Response, @Body() body: Category) {
        try {
            const categoryData = await this.categoryService.createCategory(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: categoryData, Message: 'Category created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create category.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putCategory(@Res() response: Response, @Param('id') id: string, @Body() body: Category) {
        try {
            const categoryCreated = await this.categoryService.findOneCategory(+id);
            if (categoryCreated != null) {
                const categoryData = await this.categoryService.updateCategory(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: categoryData, Message: 'Category updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Category not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Delete("/:id")
    async deleteCategory(@Res() response: Response, @Param('id') id: string) {
        try {
            const categoryCreated = await this.categoryService.findOneCategory(+id);
            if (categoryCreated != null) {
                const categoryData = await this.categoryService.removeCategory(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: categoryData, Message: 'Category was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Category not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
