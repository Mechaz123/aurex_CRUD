import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { Role } from 'src/models/role.entity';
import { RoleService } from 'src/services/role.service';
import { Response } from 'express';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get("/")
    async getAllRole(@Res() response: Response) {
        try {
            const roleData = await this.roleService.findAllRole();
            response.status(HttpStatus.OK);
            response.json({ Data: roleData, Message: 'Role loaded successfully.', Status: HttpStatus.OK, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            response.json({ Data: [], Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false })
        }
        return response;
    }

    @Get("/:id")
    async getOneRole(@Res() response: Response, @Param('id') id: string) {
        try {
            const roleData = await this.roleService.findOneRole(+id);
            if (roleData != null) {
                response.status(HttpStatus.OK);
                response.json({ Data: roleData, Message: 'Role loaded successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Role not found.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Post("/")
    async postRole(@Res() response: Response, @Body() body: Role) {
        try {
            const roleData = await this.roleService.createRole(body);
            response.status(HttpStatus.CREATED);
            response.json({ Data: roleData, Message: 'Role created successfully.', Status: HttpStatus.CREATED, Success: true });
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Body contains errors, cannot create role.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Put("/:id")
    async putRole(@Res() response: Response, @Param('id') id: string, @Body() body: Role) {
        try {
            const roleCreated = await this.roleService.findOneRole(+id);
            if (roleCreated != null) {
                const roleData = await this.roleService.updateRole(+id, body);
                response.status(HttpStatus.OK);
                response.json({ Data: roleData, Message: 'Role updated successfully.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Role not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }

    @Delete("/:id")
    async deleteRole(@Res() response: Response, @Param('id') id: string) {
        try {
            const roleCreated = await this.roleService.findOneRole(+id);
            if (roleCreated != null) {
                const roleData = await this.roleService.removeRole(+id);
                response.status(HttpStatus.OK);
                response.json({ Data: roleData, Message: 'Role was inactivated.', Status: HttpStatus.OK, Success: true });
            } else {
                response.status(HttpStatus.NOT_FOUND);
                response.json({ Data: {}, Message: 'Role not exist.', Status: HttpStatus.NOT_FOUND, Success: false });
            }
        } catch (error) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR);
            response.json({ Data: {}, Message: 'Internal server error.', Status: HttpStatus.INTERNAL_SERVER_ERROR, Success: false });
        }
        return response;
    }
}
