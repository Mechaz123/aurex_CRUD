import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuctionService } from 'src/services/auction.service';
import { Response } from 'express';
import { Auction } from 'src/models/auction.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('auction')
export class AuctionController {
    constructor(private readonly auctionService: AuctionService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllAuction(@Res() response: Response) {
        try {
            const auctionData = await this.auctionService.findAllAuction();
            response.status(HttpStatus.OK);
            response.json({ Data: auctionData, Message: 'Auctions loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneAuction(@Res() response: Response, @Param('id') id: string) {
        try {
            const auctionData = await this.auctionService.findOneAuction(+id);
            if (auctionData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: auctionData, Message: 'Auction loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Auction not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postAuction(@Res() response: Response, @Body() body: Partial<Auction>) {
        try {
            const auctionData = await this.auctionService.createAuction(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: auctionData, Message: 'Auction created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create auction.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putAuction(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<Auction>) {
        try {
            const auctionCreated = await this.auctionService.findOneAuction(+id);
            if (auctionCreated != null) {
                const auctionData = await this.auctionService.updateAuction(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: auctionData, Message: 'Auction updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Auction not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
