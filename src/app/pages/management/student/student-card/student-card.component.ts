import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../model/student';

@Component({
  selector: 'student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit {
  @Input() student: Student;

  constructor() { }

  ngOnInit() {
    console.info('STUDENT_CARD', this.student);
  }
}
