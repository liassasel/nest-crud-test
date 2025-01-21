import { IsString, IsEmail, MinLength } from '@nestjs/class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;
}