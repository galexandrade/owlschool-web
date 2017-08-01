import { Component, OnInit, Input } from '@angular/core';
import { ClassRoom } from "app/model/classRoom";

@Component({
  selector: 'class-card',
  templateUrl: './class-card.component.html',
  styleUrls: ['./class-card.component.scss']
})
export class ClassCardComponent implements OnInit {
  @Input() classRoom: ClassRoom;

  constructor() { }

  ngOnInit() {
  }

}
