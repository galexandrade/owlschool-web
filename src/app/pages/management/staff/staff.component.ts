import { Component, OnInit } from '@angular/core';
import {GlobalState} from 'app/global.state';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(private _state:GlobalState) {
    this._state.updatePageName("general.menu.staff");
  }

  ngOnInit() {
  }

}
