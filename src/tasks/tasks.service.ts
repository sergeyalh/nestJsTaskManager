import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TasksStatus } from './task-status.enum';
import { GetTaskFiltertDto } from './dto/get-tasks-filter.dto';

@ Injectable()
export class TasksService {
    constructor(
        @ InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTasks(filterDto: GetTaskFiltertDto): Promise< Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }

    async createTask(createTaskDto: CreateTaskDto): Promise< Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    async getTaskById(id: number): Promise< Task>{
        const found = await this.taskRepository.findOne(id);

        if (!found){
            throw new NotFoundException("Could not find the requested Task: " + id);
        }

        return found;
    }

    async deleteTask(id: number): Promise< void> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0){
            throw new NotFoundException("Could not find the requested Task: " + id);
        }
    }

    async updateTaskStatus(id: number, newStatus: TasksStatus): Promise< Task> {
        const task = await this.getTaskById(id);
        task.status = newStatus;
        await task.save();
        return task;
    }
}
