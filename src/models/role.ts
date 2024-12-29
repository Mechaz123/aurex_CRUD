import { IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class Role {
    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsEmpty()
    description: string

    @IsNotEmpty()
    @IsDate()
    created_at: Date
}