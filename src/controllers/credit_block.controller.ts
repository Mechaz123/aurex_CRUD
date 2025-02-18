import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { CreditBlock } from 'src/models/credit_block.entity';
import { CreditBlockService } from 'src/services/credit_block.service';

@Controller('credit_block')
export class CreditBlockController {
    constructor(private readonly creditBlockService: CreditBlockService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllCreditBlock(@Res() response: Response) {
        try {
            const creditBlockData = await this.creditBlockService.findAllCreditBlock();
            response.status(HttpStatus.OK);
            response.json({ Data: creditBlockData, Message: 'Credit block loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneCreditBlock(@Res() response: Response, @Param('id') id: string) {
        try {
            const creditBlockData = await this.creditBlockService.findOneCreditBlock(+id);
            if (creditBlockData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: creditBlockData, Message: 'Credit block loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credit block not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postCreditBlock(@Res() response: Response, @Body() body: CreditBlock) {
        try {
            const creditBlockData = await this.creditBlockService.createCreditBlock(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: creditBlockData, Message: 'Credit block created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create credit block.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putCreditBlock(@Res() response: Response, @Param('id') id: string, @Body() body: CreditBlock) {
        try {
            const creditBlockCreated = await this.creditBlockService.findOneCreditBlock(+id);
            if (creditBlockCreated != null) {
                const creditBlockData = await this.creditBlockService.updateCreditBlock(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: creditBlockData, Message: 'Credit block updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credit block not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Delete("/:id")
    async deleteCreditBlock(@Res() response: Response, @Param('id') id: string) {
        try {
            const creditBlockCreated = await this.creditBlockService.findOneCreditBlock(+id);
            if (creditBlockCreated != null) {
                const creditBlockData = await this.creditBlockService.removeCreditBlock(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: creditBlockData, Message: 'Credit block was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Credit block not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
