import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserDto } from './create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async CreateUser(createUserDto: CreateUserDto) {
        const { name, email, password } = createUserDto;

        const hashedPassword = await argon2.hash(password);
        
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (existingUser) {
            throw new Error(' An account with this email already exists ');
        }

        return this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    }

    async getAllUsers() {
        return this.prisma.user.findMany()
    }

    async getUserById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {

        const hashedPassword = await argon2.hash(updateUserDto.password);

        return this.prisma.user.update({
            where: { id },
            data: {
                name: updateUserDto.name,
                email: updateUserDto.email,
                password: hashedPassword,
            },
        });
    }

    async deleteUser(id: number) {
        return this.prisma.user.delete({
            where: { id },
        });

    }


}
