import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserRoleService } from 'src/services/user_role.service';
import { Response } from 'express';
import { UserRole } from 'src/models/user_role.entity';

@Controller('user_role')
export class UserRoleController {
    constructor(private readonly userRoleService: UserRoleService) { }

    @Get("/")
    async getAllUserRole(@Res() response: Response) {
        try {
            const userRoleData = await this.userRoleService.findAllUserRole();
            response.status(HttpStatus.OK);
            response.json({ Data: userRoleData, Message: 'User-roles loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Get("/:id")
    async getOneUserRole(@Res() response: Response, @Param('id') id: string) {
        try {
            const userRoleData = await this.userRoleService.findOneUserRole(+id);
            if (userRoleData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: userRoleData, Message: 'User-role loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'User-role not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postUserRole(@Res() response: Response, @Body() body: Partial<UserRole>) {
        try {
            const userRoleData = await this.userRoleService.createUserRole(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: userRoleData, Message: 'User-role created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create user-role.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putUserRole(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<UserRole>) {
        try {
            const userRoleCreated = await this.userRoleService.findOneUserRole(+id);
            if (userRoleCreated != null) {
                const userRoleData = await this.userRoleService.updateUserRole(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: userRoleData, Message: 'User-role updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'User-role not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteUserRole(@Res() response: Response, @Param('id') id: string) {
        try {
            const userRoleCreated = await this.userRoleService.findOneUserRole(+id);
            if (userRoleCreated != null) {
                const userRoleData = await this.userRoleService.removeUserRole(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: userRoleData, Message: 'User-role was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'User-role not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
