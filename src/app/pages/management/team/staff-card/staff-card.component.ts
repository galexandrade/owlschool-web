import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Staff } from "app/model/staff";
import { StaffService } from "app/services/staff.service";
import { ToasterService } from "angular2-toaster/angular2-toaster";

@Component({
  selector: 'staff-card',
  templateUrl: './staff-card.component.html',
  styleUrls: ['./staff-card.component.scss']
})
export class StaffCardComponent implements OnInit {
  @Output() staffDeleteEvent = new EventEmitter();
  @Input() staff: Staff;

  constructor(private staffService: StaffService,
              private toaster: ToasterService) { }

  ngOnInit() {
  }

  remove(){
    this.staffService.delete(this.staff.id).subscribe(
      res => {
          this.staffDeleteEvent.emit(this.staff);
          this.toaster.pop({
                  type: 'success',
                  body: 'Deleted with success!'
              })
      }
    );
  }

}
