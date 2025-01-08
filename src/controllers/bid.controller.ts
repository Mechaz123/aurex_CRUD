import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { BidService } from 'src/services/bid.service';
import { Response } from 'express';
import { Bid } from 'src/models/bid.entity';

@Controller('bid')
export class BidController {
    constructor(private readonly bidService: BidService) { }

    @Get("/")
    async getAllBid(@Res() response: Response) {
        try {
            const bidData = await this.bidService.findAllBid();
            response.status(HttpStatus.OK);
            response.json({ Data: bidData, Message: 'Bids loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @Get("/:id")
    async getOneBid(@Res() response: Response, @Param('id') id: string) {
        try {
            const bidData = await this.bidService.findOneBid(+id);
            if (bidData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: bidData, Message: 'Bid loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Bid not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postBid(@Res() response: Response, @Body() body: Bid) {
        try {
            const bidData = await this.bidService.createBid(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: bidData, Message: 'Bid created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create bid.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putBid(@Res() response: Response, @Param('id') id: string, @Body() body: Bid) {
        try {
            const bidCreated = await this.bidService.findOneBid(+id);
            if (bidCreated != null) {
                const bidData = await this.bidService.updateBid(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: bidData, Message: 'Bid updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Bid not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteBid(@Res() response: Response, @Param('id') id: string) {
        try {
            const bidData = await this.bidService.removeBid(+id);
            if (bidData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: bidData, Message: 'Bid was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Bid not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
