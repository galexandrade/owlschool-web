import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgaModule } from '../../theme/nga.module';
import { AppTranslationModule } from '../../app.translation.module';

import { DndModule } from 'ng2-dnd';

import { routing }       from './management.routing';
import { SchoolComponent } from './school/school.component';
import { Management } from './management.component';
import { StudentsComponent } from './students/students.component';
import { StudentCardComponent } from './students/student-card/student-card.component';
import { StudentComponent } from './student/student.component';
import { ParentCardComponent } from './student/parent-card/parent-card.component';
import { TeamComponent } from './team/team.component';
import { StaffComponent } from './staff/staff.component';
import { StaffCardComponent } from './team/staff-card/staff-card.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassComponent } from './class/class.component';
import { ClassCardComponent } from './classes/class-card/class-card.component';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
    DndModule
  ],
  entryComponents: [
    Management
  ],
  declarations: [Management, SchoolComponent, StudentsComponent, StudentCardComponent, StudentComponent, ParentCardComponent, TeamComponent, StaffComponent, StaffCardComponent, ClassesComponent, ClassComponent, ClassCardComponent]
})
export class ManagementModule { }