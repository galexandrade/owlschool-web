import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { AppTranslationModule } from '../../app.translation.module';

import { DndModule } from 'ng2-dnd';

import { routing }       from './management.routing';
import { SchoolComponent } from './school/school.component';
import { Management } from './management.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamFormComponent } from './team/team-form/team-form.component';
import { StaffCardComponent } from './team/staff-card/staff-card.component';
import { ClassListComponent } from './class/class-list/class-list.component';
import { ClassFormComponent } from './class/class-form/class-form.component';
import { ClassCardComponent } from './class/class-card/class-card.component';

import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentFormComponent } from './student/student-form/student-form.component';
import { StudentCardComponent } from './student/student-card/student-card.component';
import { ParentCardComponent } from './student/parent-card/parent-card.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
    DndModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    Management
  ],
  declarations: [
    Management,
    SchoolComponent,
    TeamListComponent,
    TeamFormComponent,
    StaffCardComponent,
    ClassListComponent,
    ClassFormComponent,
    ClassCardComponent,
    StudentListComponent,
    StudentFormComponent,
    StudentCardComponent,
    ParentCardComponent]
})
export class ManagementModule { }
