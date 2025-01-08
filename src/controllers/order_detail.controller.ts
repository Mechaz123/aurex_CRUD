import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { OrderDetailService } from 'src/services/order_detail.service';
import { Response } from 'express';
import { OrderDetail } from 'src/models/order_detail.entity';

@Controller('order_detail')
export class OrderDetailController {
    constructor(private readonly orderDetailService: OrderDetailService) { }

    @Get("/")
    async getAllOrderDetail(@Res() response: Response) {
        try {
            const orderDetailData = await this.orderDetailService.findAllOrderDetail();
            response.status(HttpStatus.OK);
            response.json({ Data: orderDetailData, Message: 'Order detail loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @Get("/:id")
    async getOneOrderDetail(@Res() response: Response, @Param('id') id: string) {
        try {
            const orderDetailData = await this.orderDetailService.findOneOrderDetail(+id);
            if (orderDetailData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: orderDetailData, Message: 'Order detail loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Order detail not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postOrderDetail(@Res() response: Response, @Body() body: OrderDetail) {
        try {
            const orderDetailData = await this.orderDetailService.createOrderDetail(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: orderDetailData, Message: 'Order detail created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create order detail.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putOrderDetail(@Res() response: Response, @Param('id') id: string, @Body() body: OrderDetail) {
        try {
            const orderDetailCreated = await this.orderDetailService.findOneOrderDetail(+id);
            if (orderDetailCreated != null) {
                const orderDetailData = await this.orderDetailService.updateOrderDetail(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: orderDetailData, Message: 'Order detail updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Order detail not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteOrderDetail(@Res() response: Response, @Param('id') id: string) {
        try {
            const orderDetailCreated = await this.orderDetailService.findOneOrderDetail(+id);
            if (orderDetailCreated != null) {
                const orderDetailData = await this.orderDetailService.removeOrderDetail(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: orderDetailData, Message: 'Order detail was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Order detail not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
