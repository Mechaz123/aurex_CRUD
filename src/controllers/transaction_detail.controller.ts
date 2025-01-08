import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { TransactionDetailService } from 'src/services/transaction_detail.service';
import { Response } from 'express';
import { TransactionDetail } from 'src/models/transaction_detail.entity';

@Controller('transaction_detail')
export class TransactionDetailController {
    constructor(private readonly transactionDetailService: TransactionDetailService) { }

    @Get("/")
    async getAllTransactionDetail(@Res() response: Response) {
        try {
            const transactionDetailData = await this.transactionDetailService.findAllTransactionDetail();
            response.status(HttpStatus.OK);
            response.json({ Data: transactionDetailData, Message: 'Transaction detail loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @Get("/:id")
    async getOneTransactionDetail(@Res() response: Response, @Param('id') id: string) {
        try {
            const transactionDetailData = await this.transactionDetailService.findOneTransactionDetail(+id);
            if (transactionDetailData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: transactionDetailData, Message: 'Transaction detail loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction detail not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postTransactionDetail(@Res() response: Response, @Body() body: TransactionDetail) {
        try {
            const transactionDetailData = await this.transactionDetailService.createTransactionDetail(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: transactionDetailData, Message: 'Transaction detail created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create transaction detail.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putTransactionDetail(@Res() response: Response, @Param('id') id: string, @Body() body: TransactionDetail) {
        try {
            const transactionDetailCreated = await this.transactionDetailService.findOneTransactionDetail(+id);
            if (transactionDetailCreated != null) {
                const transactionDetailData = await this.transactionDetailService.updateTransactionDetail(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: transactionDetailData, Message: 'Transaction detail updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction detail not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteTransactionDetail(@Res() response: Response, @Param('id') id: string) {
        try {
            const transactionDetailCreated = await this.transactionDetailService.findOneTransactionDetail(+id);
            if (transactionDetailCreated != null) {
                const transactionDetailData = await this.transactionDetailService.removeTransactionDetail(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: transactionDetailData, Message: 'Transaction detail was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction detail not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
