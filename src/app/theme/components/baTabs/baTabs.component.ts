import { Component, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { BaTabComponent } from '../baTab/baTab.component';

@Component({
  selector: 'ba-tabs',
  templateUrl: './baTabs.component.html',
  styleUrls: ['./baTabs.component.scss']
})
export class BaTabsComponent implements AfterContentInit  {

  @Output()
  tabChanged = new EventEmitter<string>();

  constructor() { }

  @ContentChildren(BaTabComponent) tabs: QueryList<BaTabComponent>;

  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(baTab: BaTabComponent){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);

    // activate the tab the user has clicked on.
    baTab.active = true;
    this.tabChanged.emit(baTab.title);

    return false;
  }

}
