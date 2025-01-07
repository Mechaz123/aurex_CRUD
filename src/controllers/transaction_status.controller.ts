import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { TransactionStatusService } from 'src/services/transaction_status.service';
import { Response } from 'express';
import { TransactionStatus } from 'src/models/transaction_status.entity';

@Controller('transaction_status')
export class TransactionStatusController {
    constructor(private readonly transactionStatusService: TransactionStatusService) { }

    @Get("/")
    async getAllTransactionStatus(@Res() response: Response) {
        try {
            const transactionStatusData = await this.transactionStatusService.findAllTransactionStatus();
            response.status(HttpStatus.OK);
            response.json({ Data: transactionStatusData, Message: 'Transaction status loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Get("/:id")
    async getOneTransactionStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const transactionStatusData = await this.transactionStatusService.findOneTransactionStatus(+id);
            if (transactionStatusData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: transactionStatusData, Message: 'Transaction status loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction status not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postTransactionStatus(@Res() response: Response, @Body() body: Partial<TransactionStatus>) {
        try {
            const transactionStatusData = await this.transactionStatusService.createTransactionStatus(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: transactionStatusData, Message: 'Transaction status created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create transaction status.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putTransactionStatus(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<TransactionStatus>) {
        try {
            const transactionStatusCreated = await this.transactionStatusService.findOneTransactionStatus(+id);
            if (transactionStatusCreated != null) {
                const transactionStatusData = await this.transactionStatusService.updateTransactionStatus(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: transactionStatusData, Message: 'Transaction status updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteTransactionStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const transactionStatusData = await this.transactionStatusService.removeTransactionStatus(+id);
            if (transactionStatusData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: transactionStatusData, Message: 'Transaction status was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
