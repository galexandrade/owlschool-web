import { Component, OnInit } from '@angular/core';
import {layoutPaths} from '../../../theme';

import './ckeditor.loader';
import 'ckeditor';


@Component({
  selector: 'app-event',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  public event_images: String = layoutPaths.images.events; 
  public ckeditorContent: String = '<p>Hello CKEditor</p>';
  public config = {
    uiColor: '#F0F3F4',
    height: '300',
  };

  constructor() { }

  ngOnInit() {
  }

}
