import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ExchangeHistory } from 'src/models/exchange_history.entity';
import { ExchangeHistoryService } from 'src/services/exchange_history.service';

@Controller('exchange_history')
export class ExchangeHistoryController {
    constructor(private readonly exchangeHistoryService: ExchangeHistoryService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllExchangeHistory(@Res() response: Response) {
        try {
            const exchangeHistoryData = await this.exchangeHistoryService.findAllExchangeHistory();
            response.status(HttpStatus.OK);
            response.json({ Data: exchangeHistoryData, Message: 'Exchanges history loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneExchangeHistory(@Res() response: Response, @Param('id') id: string) {
        try {
            const exchangeHistoryData = await this.exchangeHistoryService.findOneExchangeHistory(+id);
            if (exchangeHistoryData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: exchangeHistoryData, Message: 'Exchange history loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Exchange history not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postExchangeHistory(@Res() response: Response, @Body() body: ExchangeHistory) {
        try {
            const exchangeHistoryData = await this.exchangeHistoryService.createExchangeHistory(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: exchangeHistoryData, Message: 'Exchange history created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create exchange history.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putExchangeHistory(@Res() response: Response, @Param('id') id: string, @Body() body: ExchangeHistory) {
        try {
            const exchangeHistoryCreated = await this.exchangeHistoryService.findOneExchangeHistory(+id);
            if (exchangeHistoryCreated != null) {
                const exchangeHistoryData = await this.exchangeHistoryService.updateExchangeHistory(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: exchangeHistoryData, Message: 'Exchange history updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Exchange history not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Delete("/:id")
    async deleteExchangeHistory(@Res() response: Response, @Param('id') id: string) {
        try {
            const exchangeHistoryCreated = await this.exchangeHistoryService.findOneExchangeHistory(+id);
            if (exchangeHistoryCreated != null) {
                const exchangeHistoryData = await this.exchangeHistoryService.removeExchangeHistory(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: exchangeHistoryData, Message: 'Exchange history was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Exchange history not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
