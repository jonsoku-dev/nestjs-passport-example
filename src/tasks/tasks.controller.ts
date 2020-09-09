import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTasks(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: number, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }

  // @Patch('/:id')
  // updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }
  @Delete('/:id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
