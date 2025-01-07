import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { TransactionService } from 'src/services/transaction.service';
import { Response } from 'express';
import { Transaction } from 'src/models/transaction.entity';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Get("/")
    async getAllTransaction(@Res() response: Response) {
        try {
            const transactionData = await this.transactionService.findAllTransaction();
            response.status(HttpStatus.OK);
            response.json({ Data: transactionData, Message: 'Transaction loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @Get("/:id")
    async getOneTransaction(@Res() response: Response, @Param('id') id: string) {
        try {
            const transactionData = await this.transactionService.findOneTransaction(+id);
            if (transactionData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: transactionData, Message: 'Transaction loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postTransaction(@Res() response: Response, @Body() body: Transaction) {
        try {
            const transactionData = await this.transactionService.createTransaction(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: transactionData, Message: 'Transaction created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create transaction.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putTransaction(@Res() response: Response, @Param('id') id: string, @Body() body: Transaction) {
        try {
            const transactionCreated = await this.transactionService.findOneTransaction(+id);
            if (transactionCreated != null) {
                const transactionData = await this.transactionService.updateTransaction(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: transactionData, Message: 'Transaction updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteTransaction(@Res() response: Response, @Param('id') id: string) {
        try {
            const transactionData = await this.transactionService.removeTransaction(+id);
            if (transactionData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: transactionData, Message: 'Transaction was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
