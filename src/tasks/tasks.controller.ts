import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { filter } from 'rxjs/operators';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getAllTasksWithFilter(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }

  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTasks(
    @Body() createTaskDto: CreateTaskDto,
  ): Task {
    return this.tasksService.createTasks(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }


  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

}
