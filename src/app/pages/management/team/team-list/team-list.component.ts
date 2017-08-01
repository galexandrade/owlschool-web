import { Component, OnInit } from '@angular/core';
import {GlobalState} from 'app/global.state';
import { StaffService } from "app/services/staff.service";
import { ToasterService } from "angular2-toaster/angular2-toaster";
import { Staff } from "app/model/staff";

@Component({
  selector: 'app-team',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  team: Staff[];

  constructor(private _state:GlobalState,
              private staffService: StaffService,
              private toaster: ToasterService) {
  }

  ngOnInit(): void {
    this._state.updatePageName("general.menu.team");
    this.team = new Array<Staff>();
    this.loadStaff();
  }

  loadStaff(){
    this.staffService.get().subscribe(
      (res: any) => {
        for(let i: number = 0; i < res._embedded.staffs.length; i++) {
          let staff = res._embedded.staffs[i];
          staff.id = staff._links.self.href.split('/')[staff._links.self.href.split('/').length - 1];
          this.team.push(staff);
        }
      }
    );
  }
}
