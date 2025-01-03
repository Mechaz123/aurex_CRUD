import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserStatusService } from 'src/services/user_status.service';
import { UserStatus } from 'src/models/user_status.entity';
import { Response } from 'express';

@Controller('user_status')
export class UserStatusController {
    constructor(private readonly userStatusService: UserStatusService) { }

    @Get("/")
    async getAllUserStatus(@Res() response: Response) {
        try {
            const userStatusData = await this.userStatusService.findAllUserStatus();
            response.status(HttpStatus.OK);
            response.json({ Data: userStatusData, Message: 'User status loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Get("/:id")
    async getOneUserStatus(@Res() response: Response, @Param('id') id: string) {
        try {
            const userStatusData = await this.userStatusService.findOneUserStatus(+id);
            if (userStatusData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: userStatusData, Message: 'User status loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'User status not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postUserStatus(@Res() response: Response, @Body() body: Partial<UserStatus>) {
        try {
            const userStatusData = await this.userStatusService.createUserStatus(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: userStatusData, Message: 'User status created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create user status.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putUserStatus(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<UserStatus>) {
        try {
            const userStatusCreated = await this.userStatusService.findOneUserStatus(+id);
            if(userStatusCreated != null) {
                const userStatusData = await this.userStatusService.updateUserStatus(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: userStatusData, Message: 'User status updated successfully.', Status: HttpStatus. OK, Success: true });
            } else {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR);
                response.json({ Data: {}, Message: 'User status not exist.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
            }
        } catch(error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteUserStatus(@Res() response:Response, @Param('id') id: string) {
        try {
            const userStatusData = await this.userStatusService.removeUserStatus(+id);
            if(userStatusData != null){
                response.status(HttpStatus.OK);
                response.json({ Data: userStatusData, Message: 'User status was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR);
                response.json({ Data: {}, Message: 'User status not exist.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
            }
        } catch(error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
