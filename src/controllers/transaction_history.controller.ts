import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { TransactionHistory } from 'src/models/transaction_history.entity';
import { TransactionHistoryService } from 'src/services/transaction_history.service';

@Controller('transaction_history')
export class TransactionHistoryController {
    constructor(private readonly transactionHistoryService: TransactionHistoryService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllTransactionHistory(@Res() response: Response) {
        try {
            const transactionHistoryData = await this.transactionHistoryService.findAllTransactionHistory();
            response.status(HttpStatus.OK);
            response.json({ Data: transactionHistoryData, Message: 'Transaction history loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneTransactionHistory(@Res() response: Response, @Param('id') id: string) {
        try {
            const transactionHistoryData = await this.transactionHistoryService.findOneTransactionHistory(+id);
            if (transactionHistoryData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: transactionHistoryData, Message: 'Transaction history loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction history not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postTransactionHistory(@Res() response: Response, @Body() body: TransactionHistory) {
        try {
            const transactionHistoryData = await this.transactionHistoryService.createTransactionHistory(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: transactionHistoryData, Message: 'Transaction history created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create transaction history.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putTransactionHistory(@Res() response: Response, @Param('id') id: string, @Body() body: TransactionHistory) {
        try {
            const transactionHistoryCreated = await this.transactionHistoryService.findOneTransactionHistory(+id);
            if (transactionHistoryCreated != null) {
                const transactionHistoryData = await this.transactionHistoryService.updateTransactionHistory(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: transactionHistoryData, Message: 'Transaction history updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction history not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Delete("/:id")
    async deleteTransactionHistory(@Res() response: Response, @Param('id') id: string) {
        try {
            const transactionHistoryCreated = await this.transactionHistoryService.findOneTransactionHistory(+id);
            if (transactionHistoryCreated != null) {
                const transactionHistoryData = await this.transactionHistoryService.removeTransactionHistory(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: transactionHistoryData, Message: 'Transaction history was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Transaction history not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
