import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = [
        { id: 1, name: 'Nomayen', age: 23 },
        { id: 2, name: 'Hosain', age: 22 },
        { id: 3, name: 'Ohin', age: 20 },
    ];

    getAllStudents() {
        return this.students
    }
    getAllStudentsById(id: number) {
        const student = this.students.find(student => student.id === id);

        if (!student) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        return student;
    }

    // POST 

    cretateStudent(data: { name: string, age: number }) {
        const newStudent = {
            id: Date.now(),
            ...data,
        }
        this.students.push(newStudent);
        return newStudent
    }

    // Put 
    updateStudent(id: number, data: { name?: string; age?: number }) {
        const studentIndex = this.students.findIndex((student) => student.id === id);

        if (studentIndex === -1) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        this.students[studentIndex] = {
            ...this.students[studentIndex],
            ...data, // only override provided fields
        };

        return this.students[studentIndex];
    }
    deleteStudent(id: number) {
        const studentIndex = this.students.findIndex((student) => student.id === id);

        if (studentIndex === -1) {
            throw new NotFoundException(`Student with id ${id} not found`);
        }

        const deleted = this.students[studentIndex];
        this.students.splice(studentIndex, 1); // remove from array

        return deleted;
    }

}
