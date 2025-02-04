import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { UserStatusService } from 'src/services/user_status.service';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';

@Controller('authentication')
export class AuthenticationController {
    constructor(
        private readonly userStatusService: UserStatusService,
        private readonly userService: UserService
    ) { }

    @Get("/user_status")
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

    @Get("/user/:id")
    async getOneUser(@Res() response: Response, @Param('id') id: string) {
        try {
            const userData = await this.userService.findOneUser(+id);
            if (userData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: userData, Message: 'User loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'User not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
