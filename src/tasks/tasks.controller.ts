import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.createTask(createTaskDto);
    }

    @Get()
    async getAllTasks() {
    return this.tasksService.getAllTasks();
    }

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.getTaskById(id);
    }

    @Patch(':id')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

    @Delete(':id')
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.deleteTask(id);
    }
}
