import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ba-tab',
  templateUrl: './baTab.component.html',
  styleUrls: ['./baTab.component.scss']
})
export class BaTabComponent implements OnInit {
  @Input('tabTitle') title: string;
  @Input() active = false;

  constructor() { }

  ngOnInit() {
  }

}
