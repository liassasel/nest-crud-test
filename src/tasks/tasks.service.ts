import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    async createTask(createTaskDto: CreateTaskDto) {
        return this.prisma.task.create({
            data:{
                ...createTaskDto,
            },
        });
    }


    async getAllTasks() {
        return this.prisma.task.findMany();
    }


    async getTaskById(id: number) {
        return this.prisma.task.findUnique({
            where: { id },
        })
    }

    async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
        return this.prisma.task.update({
            where: { id },
            data: {
                ...updateTaskDto,
            },
        });
    }

    async deleteTask(id: number) {
        return this.prisma.task.delete({
            where: { id },
        });
    }
}
