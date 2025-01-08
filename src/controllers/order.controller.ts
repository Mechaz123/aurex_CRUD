import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { OrderService } from 'src/services/order.service';
import { Response } from 'express';
import { Order } from 'src/models/order.entity';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get("/")
    async getAllOrder(@Res() response: Response) {
        try {
            const orderData = await this.orderService.findAllOrder();
            response.status(HttpStatus.OK);
            response.json({ Data: orderData, Message: 'Orders loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Get("/:id")
    async getOneOrder(@Res() response: Response, @Param('id') id: string) {
        try {
            const orderData = await this.orderService.findOneOrder(+id);
            if (orderData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: orderData, Message: 'Order loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Order not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postOrder(@Res() response: Response, @Body() body: Partial<Order>) {
        try {
            const orderData = await this.orderService.createOrder(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: orderData, Message: 'Order created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create order.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putOrder(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<Order>) {
        try {
            const orderCreated = await this.orderService.findOneOrder(+id);
            if (orderCreated != null) {
                const orderData = await this.orderService.updateOrder(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: orderData, Message: 'Order updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Order not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
