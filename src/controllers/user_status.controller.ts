import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserStatus } from 'src/models/user_status';

@Controller('user_status')
export class UserStatusController {
    @Get("/")
    getAllUserStatus(){
        
    }

    @Get("/:id")
    getOneUserStatus(@Param('id') id: string){

    }

    @Post("/")
    postUserStatus(@Body() body: UserStatus){

    }

    @Put("/:id")
    putUserStatus(@Param('id') id: string, @Body() body: UserStatus){

    }

    @Delete("/:id")
    deleteUserStatus(@Param('id') id: string){

    }
}
