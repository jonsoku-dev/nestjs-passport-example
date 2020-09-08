import { Controller } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  // @Get()
  // getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getAllTasksWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  //
  // }
  //
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }
  //
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTasks(
  //   @Body() createTaskDto: CreateTaskDto,
  // ): Task {
  //   return this.tasksService.createTasks(createTaskDto);
  // }
  //
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   this.tasksService.deleteTask(id);
  // }
  //
  //
  // @Patch('/:id/status')
  // updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
  //
  // @Patch('/:id')
  // updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }

}
