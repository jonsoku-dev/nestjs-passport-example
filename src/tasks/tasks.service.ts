import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {
  }

  // getAllTasks(): Task [] {
  //   return this.tasks;
  // }
  //
  // getAllTasksWithFilter(filterDto: GetTasksFilterDto): Task [] {
  //   const { status, search } = filterDto;
  //
  //   let tasks = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
  //   }
  //
  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
  //   let task = this.getTaskById(id);
  //   task = {
  //     ...task,
  //     ...updateTaskDto,
  //   };
  //   return task;
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  //
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id)
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }
}
