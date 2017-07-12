import {Component} from '@angular/core';
import {GlobalState} from '../../global.state';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  constructor(private _state:GlobalState) {
    this._state.updatePageName("general.menu.dashboard");
  }

}
