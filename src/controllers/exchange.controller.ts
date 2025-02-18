import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Exchange } from 'src/models/exchange.entity';
import { ExchangeService } from 'src/services/exchange.service';

@Controller('exchange')
export class ExchangeController {
    constructor(private readonly exchangeService: ExchangeService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllExchange(@Res() response: Response) {
        try {
            const exchangeData = await this.exchangeService.findAllExchange();
            response.status(HttpStatus.OK);
            response.json({ Data: exchangeData, Message: 'Exchange loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneExchange(@Res() response: Response, @Param('id') id: string) {
        try {
            const exchangeData = await this.exchangeService.findOneExchange(+id);
            if (exchangeData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: exchangeData, Message: 'Exchange loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Exchange not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postExchange(@Res() response: Response, @Body() body: Exchange) {
        try {
            const exchangeData = await this.exchangeService.createExchange(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: exchangeData, Message: 'Exchange created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create exchange.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putExchange(@Res() response: Response, @Param('id') id: string, @Body() body: Exchange) {
        try {
            const exchangeCreated = await this.exchangeService.findOneExchange(+id);
            if (exchangeCreated != null) {
                const exchangeData = await this.exchangeService.updateExchange(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: exchangeData, Message: 'Exchange updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Exchange not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Delete("/:id")
    async deleteExchange(@Res() response: Response, @Param('id') id: string) {
        try {
            const exchangeCreated = await this.exchangeService.findOneExchange(+id);
            if (exchangeCreated != null) {
                const exchangeData = await this.exchangeService.removeExchange(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: exchangeData, Message: 'Exchange was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Exchange not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
