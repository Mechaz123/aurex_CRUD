import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Permission } from 'src/models/permission';

@Controller('permission')
export class PermissionController {
    @Get("/")
    getAllPermission(){

    }

    @Get("/:id")
    getOnePermission(@Param('id') id: string){

    }

    @Post("/")
    postPermission(@Body() body: Permission){

    }

    @Put("/:id")
    putPermission(@Param('id') id: string, @Body() body: Permission){
          
    }

    @Delete("/:id")
    deletePermission(@Param('id') id: string){

    }
}
