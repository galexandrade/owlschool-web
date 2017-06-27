import {Component} from '@angular/core';
import * as jQuery from 'jquery';

import {CalendarService} from './calendar.service';

import { Router } from '@angular/router';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss']
})
export class Calendar {

  public calendarConfiguration:any;
  private _calendar:Object;

  constructor(private router: Router, private _calendarService:CalendarService) {
    this.calendarConfiguration = this._calendarService.getData();
    this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
    this.calendarConfiguration.eventClick = (calEvent, jsEvent, view) => this._eventClick(calEvent, jsEvent, view);
  }

  public onCalendarReady(calendar):void {
    this._calendar = calendar;
  }

  private _onSelect(start, end):void {

    if (this._calendar != null) {
      let title = prompt('Event Title:');
      let eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
      }
      jQuery(this._calendar).fullCalendar('unselect');
    }
  }

  private _eventClick(calEvent, jsEvent, view){
    this.router.navigate(['/pages/events/view']);
  }
}
