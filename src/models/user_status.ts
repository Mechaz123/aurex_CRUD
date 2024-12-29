import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UserStatus {

    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsEmpty()
    description: string
}