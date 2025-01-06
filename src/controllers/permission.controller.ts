import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Permission } from 'src/models/permission.entity';
import { PermissionService } from 'src/services/permission.service';
import { Response } from 'express';

@Controller('permission')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Get("/")
    async getAllPermission(@Res() response: Response) {
        try {
            const permissionData = await this.permissionService.findAllPermission();
            response.status(HttpStatus.OK);
            response.json({ Data: permissionData, Message: 'Permissions loaded sucessfully.', Status: HttpStatus.OK, Success: true })
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @Get("/:id")
    async getOnePermission(@Res() response: Response, @Param('id') id: string) {
        try {
            const permissionData = await this.permissionService.findOnePermission(+id);
            if (permissionData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: permissionData, Message: 'Permission loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Permission not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postPermission(@Res() response: Response, @Body() body: Permission) {
        try {
            const permissionData = await this.permissionService.createPermission(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: permissionData, Message: 'Permission created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create permission.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putPermission(@Res() response: Response, @Param('id') id: string, @Body() body: Permission) {
        try {
            const permissionCreated = await this.permissionService.findOnePermission(+id);
            if (permissionCreated != null) {
                const permissionData = await this.permissionService.updatePermission(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: permissionData, Message: 'Permission updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Permission not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deletePermission(@Res() response: Response, @Param('id') id: string) {
        try {
            const permissionData = await this.permissionService.removePermission(+id);
            if (permissionData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: permissionData, Message: 'Permission was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Permission not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response
    }
}
