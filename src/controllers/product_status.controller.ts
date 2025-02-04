import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ProductStatusService } from 'src/services/product_status.service';
import { Response } from 'express';
import { ProductStatus } from 'src/models/product_status.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('product_status')
export class ProductStatusController {
    constructor(private readonly productStatusService: ProductStatusService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllProductStatus(@Res() response: Response) {
        try {
            const productStatusData = await this.productStatusService.findAllProductStatus();
            response.status(HttpStatus.OK);
            response.json({ Data: productStatusData, Message: 'Product status loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneProductStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const productStatusData = await this.productStatusService.findOneProductStatus(+id);
            if (productStatusData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: productStatusData, Message: 'Product status loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Product status not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postProductStatus(@Res() response: Response, @Body() body: Partial<ProductStatus>) {
        try {
            const productStatusData = await this.productStatusService.createProductStatus(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: productStatusData, Message: 'Product status created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create product status.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putProductStatus(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<ProductStatus>) {
        try {
            const productStatusCreated = await this.productStatusService.findOneProductStatus(+id);
            if (productStatusCreated != null) {
                const productStatusData = await this.productStatusService.updateProductStatus(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: productStatusData, Message: 'Product status updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Product status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Delete("/:id")
    async deleteProductStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const productStatusCreated = await this.productStatusService.findOneProductStatus(+id);
            if (productStatusCreated != null) {
                const productStatusData = await this.productStatusService.removeProductStatus(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: productStatusData, Message: 'Product status was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Product status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
