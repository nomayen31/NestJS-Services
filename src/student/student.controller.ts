import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Patch,
  Delete,
} from "@nestjs/common";
import { StudentService } from "./student.service";

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) { }

  // GET /student
  @Get()
  getAll() {
    return this.studentService.getAllStudents();
  }

  // GET /student/:id
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getStudentById(id);
  }

  // POST /student
  @Post()
  create(@Body() body: { name: string; age: number }) {
    return this.studentService.createStudent(body);
  }

  // PUT /student/:id (full update)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string; age: number },
  ) {
    return this.studentService.updateStudent(id, body);
  }

  // PATCH /student/:id (partial update)
  @Patch(':id')
  patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<{ name: string; age: number }>,
  ) {
    return this.studentService.patchStudent(id, body);
  }

  // DELETE /student/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deleteStudent(id);
  }
}
