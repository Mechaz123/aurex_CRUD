import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { OrderStatusService } from 'src/services/order_status.service';
import { Response } from 'express';
import { OrderStatus } from 'src/models/order_status.entity';

@Controller('order_status')
export class OrderStatusController {
    constructor(private readonly orderStatusService: OrderStatusService) { }

    @Get("/")
    async getAllOrderStatus(@Res() response: Response) {
        try {
            const orderStatusData = await this.orderStatusService.findAllOrderStatus();
            response.status(HttpStatus.OK);
            response.json({ Data: orderStatusData, Message: 'Orders status loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Get("/:id")
    async getOneOrderStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const orderStatusData = await this.orderStatusService.findOneOrderStatus(+id);
            if (orderStatusData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: orderStatusData, Message: 'Order status loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Order status not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postOrderStatus(@Res() response: Response, @Body() body: Partial<OrderStatus>) {
        try {
            const orderStatusData = await this.orderStatusService.createOrderStatus(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: orderStatusData, Message: 'Order status created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create order status.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putOrderStatus(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<OrderStatus>) {
        try {
            const orderStatusCreated = await this.orderStatusService.findOneOrderStatus(+id);
            if (orderStatusCreated != null) {
                const orderStatusData = await this.orderStatusService.updateOrderStatus(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: orderStatusData, Message: 'Order status updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Order status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteOrderStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const orderStatusData = await this.orderStatusService.removeOrderStatus(+id);
            if (orderStatusData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: orderStatusData, Message: 'Order status was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Order status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
