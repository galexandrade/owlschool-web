import { Component, OnInit } from '@angular/core';
import { GlobalState } from '../../../global.state';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private _state: GlobalState) { }

  ngOnInit() {
  }

}
