import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/models/user.entity';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("/")
    async getAllUser(@Res() response: Response) {
        try {
            const userData = await this.userService.findAllUser();
            response.status(HttpStatus.OK);
            response.json({ Data: userData, Message: 'Users loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Get("/:id")
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

    @Post("/")
    async postUser(@Res() response: Response, @Body() body: Partial<User>) {
        try {
            const userData = await this.userService.createUser(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: userData, Message: 'User created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create user.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putUser(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<User>) {
        try {
            const userCreated = await this.userService.findOneUser(+id);
            if (userCreated != null) {
                const userData = await this.userService.updateUser(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: userData, Message: 'User updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'User not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
