import { Component, OnInit } from '@angular/core';
import {layoutPaths} from '../../../theme';

@Component({
  selector: 'app-event',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  event_images: String = layoutPaths.images.events; 

  constructor() { }

  ngOnInit() {
    console.log(this.event_images);
  }

}
