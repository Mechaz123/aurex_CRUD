import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('user_status')
export class UserStatusController {
    @Get("/")
    getAllUserStatus(){
        
    }
    @Get("/:id")
    getOneUserStatus(){

    }

    @Post("/")
    postUserStatus(@Body() body : any){

    }

    @Put("/:id")
    putUserStatus(@Body() body : any){

    }

    @Delete("/:id")
    deleteUserStatus(){

    }
}
