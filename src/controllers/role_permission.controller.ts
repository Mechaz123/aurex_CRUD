import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { RolePermission } from 'src/models/role_permission.entity';
import { RolePermissionService } from 'src/services/role_permission.service';

@Controller('role_permission')
export class RolePermissionController {
    constructor(private readonly rolePermissionService: RolePermissionService) { }

    @Get("/")
    async getAllRolePermission(@Res() response: Response) {
        try {
            const rolePermissionData = await this.rolePermissionService.findAllRolePermission();
            response.status(HttpStatus.OK);
            response.json({ Data: rolePermissionData, Message: 'Role-permission loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Get("/:id")
    async getOneRolePermission(@Res() response: Response, @Param('id') id: string) {
        try {
            const rolePermissionData = await this.rolePermissionService.findOneRolePermission(+id);
            if (rolePermissionData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: rolePermissionData, Message: 'Role-permission loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Role-permission not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postRolePermission(@Res() response: Response, @Body() body: Partial<RolePermission>) {
        try {
            const rolePermissionData = await this.rolePermissionService.createRolePermission(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: rolePermissionData, Message: 'Role-permission created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create role-permission.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putRolePermission(@Res() response: Response, @Param('id') id: string, @Body() body: Partial<RolePermission>) {
        try {
            const rolePermissionCreated = await this.rolePermissionService.findOneRolePermission(+id);
            if (rolePermissionCreated != null) {
                const rolePermissionData = await this.rolePermissionService.updateRolePermission(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: rolePermissionData, Message: 'Role-permission updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Role-permission not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteRolePermission(@Res() response: Response, @Param('id') id: string) {
        try {
            const rolePermissionData = await this.rolePermissionService.removeRolePermission(+id);
            if (rolePermissionData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: rolePermissionData, Message: 'Role-permission was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Role-permission not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
