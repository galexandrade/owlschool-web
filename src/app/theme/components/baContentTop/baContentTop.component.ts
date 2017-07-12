import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { GlobalState } from '../../../global.state';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {

  public activePageTitle:string = '';
  public activePageSubTitle:string = '';

  constructor(private _state:GlobalState, private _location: Location) {
    this._state.activePageNameChanged.subscribe((activeLink) => {
      this.activePageTitle = activeLink[0];
      this.activePageSubTitle = activeLink.length > 1 ? activeLink[1] : '';
      console.log(this.activePageTitle);
      console.log(this.activePageSubTitle);
    })
  }

  goBack(){
    this._location.back();
  }
}
