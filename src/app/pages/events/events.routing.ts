import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Events } from './events.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventViewComponent } from './event-view/event-view.component';

const routes: Routes = [
  {
    path: '',
    component: Events
  },
  { 
    path: 'view', 
    component: EventViewComponent 
  },
  { 
    path: 'edit', 
    component: EventEditComponent 
  }
];

export const routing = RouterModule.forChild(routes);
