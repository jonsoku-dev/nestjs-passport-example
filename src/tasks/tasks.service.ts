import { Injectable } from '@nestjs/common';
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
    return this.tasks.find(task => task.id === id);
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
    if (!task) {
      throw Error('task가 존재하지 않습니다. ');
    }
    task = {
      ...task,
      ...updateTaskDto,
    };
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    if (!task) {
      throw Error('task가 존재하지 않습니다. ');
    }
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
