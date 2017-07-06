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
  @Output() studentDeleteEvent = new EventEmitter();
  @Input() student: Student;

  constructor(private studentService: StudentService,
              private toaster: ToasterService) { }

  ngOnInit() {
    console.info('STUDENT_CARD', this.student);
  }

  remove(){
    this.studentService.delete(this.student.id).subscribe(
      res => {
          this.studentDeleteEvent.next(this.student);
          this.toaster.pop({
                  type: 'success',
                  body: 'Deleted with success!'
              })
      }
    );
  }

}
