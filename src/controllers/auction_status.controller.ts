import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AuctionStatusService } from 'src/services/auction_status.service';
import { Response } from 'express';
import { AuctionStatus } from 'src/models/auction_status.entity';
import { AuthenticationGuard } from 'src/guards/authentication.guard';

@Controller('auction_status')
export class AuctionStatusController {
    constructor(private readonly auctionStatusService: AuctionStatusService) { }

    @UseGuards(AuthenticationGuard)
    @Get("/")
    async getAllAuctionStatus(@Res() response: Response) {
        try {
            const auctionStatusData = await this.auctionStatusService.findAllAuctionStatus();
            response.status(HttpStatus.OK);
            response.json({ Data: auctionStatusData, Message: 'Auction status loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Get("/:id")
    async getOneAuctionStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const auctionStatusData = await this.auctionStatusService.findOneAuctionStatus(+id);
            if (auctionStatusData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: auctionStatusData, Message: 'Auction status loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Auction status not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Post("/")
    async postAuctionStatus(@Res() response: Response, @Body() body: Partial<AuctionStatus>) {
        try {
            const auctionStatusData = await this.auctionStatusService.createAuctionStatus(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: auctionStatusData, Message: 'Auction status created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create auction status.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Put("/:id")
    async putAuctionStatus(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<AuctionStatus>) {
        try {
            const auctionStatusCreated = await this.auctionStatusService.findOneAuctionStatus(+id);
            if (auctionStatusCreated != null) {
                const auctionStatusData = await this.auctionStatusService.updateAuctionStatus(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: auctionStatusData, Message: 'Auction status updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Auction status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @UseGuards(AuthenticationGuard)
    @Delete("/:id")
    async deleteAuctionStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const auctionStatusCreated = await this.auctionStatusService.findOneAuctionStatus(+id);
            if (auctionStatusCreated != null) {
                const auctionStatusData = await this.auctionStatusService.removeAuctionStatus(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: auctionStatusData, Message: 'Auction status was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Auction status not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
