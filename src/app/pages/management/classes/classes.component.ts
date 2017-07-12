import { Component, OnInit } from '@angular/core';
import {GlobalState} from 'app/global.state';

@Component({
  selector: 'classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  constructor(private _state:GlobalState) {
    this._state.updatePageName("general.menu.classes");
  }

  ngOnInit() {
  }

}
