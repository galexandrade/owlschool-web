import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../model/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: Student[];

  constructor(private studentService: StudentService,
              private toaster: ToasterService) { }

  ngOnInit() {
    this.students = new Array<Student>();
    this.loadStudents();
  }

  loadStudents(){
    this.studentService.get().subscribe(
      (res: any) => {
        for(let i: number = 0; i < res._embedded.students.length; i++) {
          let student = res._embedded.students[i];
          student.id = student._links.self.href.split('/')[student._links.self.href.split('/').length - 1];
          this.students.push(student);
        }
      }
    );
  }

  removeStudent(student: Student){
    let index = this.students.indexOf(student);
    if (index > -1) {
        this.students.splice(index, 1);
    }
  }
}
