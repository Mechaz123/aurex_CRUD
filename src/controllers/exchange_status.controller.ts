import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ExchangeStatus } from 'src/models/exchange_status.entity';
import { ExchangeStatusService } from 'src/services/exchange_status.service';

@Controller('exchange_status')
export class ExchangeStatusController {
    constructor(private readonly exchangeStatusService: ExchangeStatusService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllExchangeStatus(@Res() response: Response) {
        try {
            const exchangeStatusData = await this.exchangeStatusService.findAllExchangeStatus();
            response.status(HttpStatus.OK);
            response.json({ Data: exchangeStatusData, Message: 'Exchanges status loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneExchangeStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const exchangeStatusData = await this.exchangeStatusService.findOneExchangeStatus(+id);
            if (exchangeStatusData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: exchangeStatusData, Message: 'Exchange status loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Exchange status not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postExchangeStatus(@Res() response: Response, @Body() body: Partial<ExchangeStatus>) {
        try {
            const exchangeStatusData = await this.exchangeStatusService.createExchangeStatus(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: exchangeStatusData, Message: 'Exchange status created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create exchange status.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putExchangeStatus(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<ExchangeStatus>) {
        try {
            const exchangeStatusCreated = await this.exchangeStatusService.findOneExchangeStatus(+id);
            if (exchangeStatusCreated != null) {
                const exchangeStatusData = await this.exchangeStatusService.updateExchangeStatus(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: exchangeStatusData, Message: 'Exchange status updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Exchange status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Delete("/:id")
    async deleteExchangeStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const exchangeStatusCreated = await this.exchangeStatusService.findOneExchangeStatus(+id)
            if (exchangeStatusCreated != null) {
                const exchangeStatusData = await this.exchangeStatusService.removeExchangeStatus(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: exchangeStatusData, Message: 'Exchange status was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Exchange status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
