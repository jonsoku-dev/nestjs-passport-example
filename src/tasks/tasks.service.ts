import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task [] {
    return this.tasks;
  }

  getAllTasksWithFilter(filterDto: GetTasksFilterDto): Task [] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const foundTask = this.tasks.find(task => task.id === id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return foundTask;
  }

  createTasks(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid.v1(),
      status: TaskStatus.OPEN,
      ...createTaskDto,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    let task = this.getTaskById(id);
    task = {
      ...task,
      ...updateTaskDto,
    };
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id)
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}
