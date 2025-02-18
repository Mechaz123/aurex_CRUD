import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { Credit } from 'src/models/credit.entity';
import { CreditService } from 'src/services/credit.service';

@Controller('credit')
export class CreditController {
    constructor(private readonly creditService: CreditService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllCredit(@Res() response: Response) {
        try {
            const creditData = await this.creditService.findAllCredit();
            response.status(HttpStatus.OK);
            response.json({ Data: creditData, Message: 'Credit loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneCredit(@Res() response: Response, @Param('id') id: string) {
        try {
            const creditData = await this.creditService.findOneCredit(+id);
            if (creditData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: creditData, Message: 'Credit loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credit not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postCredit(@Res() response: Response, @Body() body: Credit) {
        try {
            const creditData = await this.creditService.createCredit(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: creditData, Message: 'Credit created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create credit.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putCredit(@Res() response: Response, @Param('id') id: string, @Body() body: Credit) {
        try {
            const creditCreated = await this.creditService.findOneCredit(+id);
            if (creditCreated != null) {
                const creditData = await this.creditService.updateCredit(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: creditData, Message: 'Credit updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credit not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Delete("/:id")
    async deleteCredit(@Res() response: Response, @Param('id') id: string) {
        try {
            const creditCreated = await this.creditService.findOneCredit(+id);
            if (creditCreated != null) {
                const creditData = await this.creditService.removeCredit(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: creditData, Message: 'Credit was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credit not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
