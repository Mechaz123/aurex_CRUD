import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ProductService } from 'src/services/product.service';
import { Response } from 'express';
import { Product } from 'src/models/product.entity';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get("/")
    async getAllProduct(@Res() response: Response) {
        try {
            const productData = await this.productService.findAllProduct();
            response.status(HttpStatus.OK);
            response.json({ Data: productData, Message: 'Products loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @Get("/:id")
    async getOneProduct(@Res() response: Response, @Param('id') id: string) {
        try {
            const productData = await this.productService.findOneProduct(+id);
            if (productData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: productData, Message: 'Product loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Product not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postProduct(@Res() response: Response, @Body() body: Product) {
        try {
            const productData = await this.productService.createProduct(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: productData, Message: 'Product created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create product.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putProduct(@Res() response: Response, @Param('id') id: string, @Body() body: Product) {
        try {
            const productCreated = await this.productService.findOneProduct(+id);
            if (productCreated != null) {
                const productData = await this.productService.updateProduct(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: productData, Message: 'Product updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Product not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
