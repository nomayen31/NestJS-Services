import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // GET /student
  @Get()
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  // GET /student/:id
  @Get(':id')
  getStudentById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getAllStudentsById(id);
  }

  // POST /student
  @Post()
  createStudent(@Body() body: { name: string; age: number }) {
    return this.studentService.createStudent(bjody);
  }

  // PUT /student/:id
  @Put(':id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name?: string; age?: number },
  ) {
    return this.studentService.updateStudent(id, body);
  }

  // DELETE /student/:id
  @Delete(':id')
  deleteStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deleteStudent(id);
  }
}
