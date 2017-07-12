import { Component, OnInit } from '@angular/core';
import {GlobalState} from 'app/global.state';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(private _state:GlobalState) {
    this._state.updatePageName("general.menu.team");
  }

  ngOnInit() {
  }

}
