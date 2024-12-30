import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Role } from 'src/models/role.entity';

@Controller('role')
export class RoleController {
    @Get("/")
    getAllRole(){

    }

    @Get("/:id")
    getOneRole(@Param('id') id: string){

    }

    @Post("/")
    postRole(@Body() body: Role){

    }

    @Put("/:id")
    putRole(@Param('id') id: string, @Body() body: Role){

    }

    @Delete("/:id")
    deleteRole(@Param('id') id: string){

    }
}
