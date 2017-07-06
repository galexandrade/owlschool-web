import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgaModule } from '../../theme/nga.module';
import { AppTranslationModule } from '../../app.translation.module';

import { DndModule } from 'ng2-dnd';

import { routing }       from './management.routing';
import { SchoolComponent } from './school/school.component';
import { Management } from './management.component';
import { TeamComponent } from './team/team.component';
import { StaffComponent } from './staff/staff.component';
import { StaffCardComponent } from './team/staff-card/staff-card.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassComponent } from './class/class.component';
import { ClassCardComponent } from './classes/class-card/class-card.component';

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
    FormsModule
  ],
  entryComponents: [
    Management
  ],
  declarations: [
    Management,
    SchoolComponent,
    TeamComponent,
    StaffComponent,
    StaffCardComponent,
    ClassesComponent,
    ClassComponent,
    ClassCardComponent,
    StudentListComponent,
    StudentFormComponent,
    StudentCardComponent,
    ParentCardComponent]
})
export class ManagementModule { }
