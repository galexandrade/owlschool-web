import {Component} from '@angular/core';
import {GlobalState} from 'app/global.state';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class Events {

  constructor(private _state:GlobalState) {
    this._state.updatePageName("general.menu.events");
  }
}
