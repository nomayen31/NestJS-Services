import { Injectable, NotFoundException } from '@nestjs/common';

// Optional: Create Type
export interface Student {
    id: number;
    name: string;
    age: number;
}

@Injectable()
export class StudentService {
    private students: Student[] = [
        { id: 1, name: 'Nomayen', age: 23 },
        { id: 2, name: 'Hosain', age: 22 },
        { id: 3, name: 'Ohin', age: 20 },
    ];

    // ----- GET ALL -----
    getAllStudents() {
        return this.students;
    }

    // ----- GET BY ID -----
    getStudentById(id: number) {
        const student = this.students.find((s) => s.id === id);

        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        return student;
    }

    // ----- POST -----
    createStudent(data: { name: string; age: number }) {
        const newStudent: Student = {
            id: Date.now(),
            ...data,
        };

        this.students.push(newStudent);
        return newStudent;
    }

    // ----- PUT (full update) -----
    updateStudent(id: number, data: { name: string; age: number }) {
        const index = this.students.findIndex((s) => s.id === id);

        if (index === -1) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        // Full replace
        this.students[index] = {
            id,
            ...data,
        };

        return this.students[index];
    }

    // ----- PATCH (partial update) -----
    patchStudent(id: number, data: Partial<{ name: string; age: number }>) {
        const index = this.students.findIndex((s) => s.id === id);

        if (index === -1) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        // Partial update ausing Object.assign
        Object.assign(this.students[index], data);

        return this.students[index];
    }

    // ----- DELETE -----
    deleteStudent(id: number) {
        const index = this.students.findIndex((s) => s.id === id);

        if (index === -1) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        const deleted = this.students[index];
        this.students.splice(index, 1);

        return {
            message: `Student with id ${id} has been deleted successfully`,
            deletedStudent: deleted,
        };
    }

}
