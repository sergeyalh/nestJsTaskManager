import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksStatus } from './task-status.enum';
import { GetTaskFiltertDto } from './dto/get-tasks-filter.dto';

@ Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @ Get()
    getTasks(@ Query(ValidationPipe) filterDto: GetTaskFiltertDto): Promise< Task[]>{
        return this.tasksService.getTasks(filterDto);
    }

    @ Get('/:id')
    getTaskByID(@ Param('id', ParseIntPipe) id:number): Promise< Task> {
        return this.tasksService.getTaskById(id);
    }

    @ Delete('/:id')
    deleteTaskByID(@ Param('id', ParseIntPipe) id:number): Promise< void> {
        return this.tasksService.deleteTask(id);
    }

    @ Post()
    @ UsePipes(ValidationPipe)
    createTask(@ Body() createTaskDto: CreateTaskDto): Promise< Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @ Patch('/:id/status')
    updateTaskStatus(
        @ Param('id', ParseIntPipe) id:number,
        @ Body('status', TaskStatusValidationPipe) status: TasksStatus): Promise< Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
