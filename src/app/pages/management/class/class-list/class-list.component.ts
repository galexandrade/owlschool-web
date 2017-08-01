import { Component, OnInit } from '@angular/core';
import {GlobalState} from 'app/global.state';
import { ClassRoom } from "app/model/classRoom";
import { ClassRoomService } from "app/services/classRoom.service";

@Component({
  selector: 'classes',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
  classRooms: ClassRoom[];

  constructor(private _state:GlobalState,
              private classRoomService: ClassRoomService) {
  }

  ngOnInit(): void {
    this._state.updatePageName("general.menu.classes");
    this.classRooms = new Array<ClassRoom>();
    this.loadClassRooms();
  }

  loadClassRooms(){
    this.classRoomService.get().subscribe(
      (res: any) => {
        for(let i: number = 0; i < res._embedded.classRooms.length; i++) {
          let classRoom = res._embedded.classRooms[i];
          classRoom.id = classRoom._links.self.href.split('/')[classRoom._links.self.href.split('/').length - 1];
          this.classRooms.push(classRoom);
        }
        console.log(this.classRooms);
      }
    );
  }

}
