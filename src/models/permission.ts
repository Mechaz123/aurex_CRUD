import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class Permission {
    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    resource: string

    @IsString()
    @IsNotEmpty()
    action: string
}