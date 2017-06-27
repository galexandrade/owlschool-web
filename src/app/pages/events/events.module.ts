import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { AppTranslationModule } from '../../app.translation.module';
import { routing } from './events.routing';
import { Events } from './events.component';
import { EventViewComponent } from './event-view/event-view.component';
import { EventEditComponent } from './event-edit/event-edit.component';

import { CKEditorModule } from 'ng2-ckeditor';

import { Calendar } from './calendar';
import { CalendarService } from './calendar/calendar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    CKEditorModule
  ],
  entryComponents: [
    Events
  ],
  declarations: [
    Events,
    EventViewComponent,
    EventEditComponent,
    Calendar
  ],
  providers: [
    CalendarService,
  ]
})
export class EventsModule { }
