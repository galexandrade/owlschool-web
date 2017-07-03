import { NgModule } from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentRoutingModule } from './student-routing.module';

import { NgaModule } from '../../../theme/nga.module';
import { AppTranslationModule } from '../../../app.translation.module';

import { StudentsComponent } from './students.component';
import { StudentComponent } from '../student/student.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { ParentCardComponent } from '../student/parent-card/parent-card.component';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule,
    AppTranslationModule,
    NgaModule,
    DndModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    StudentsComponent,
    StudentComponent,
    StudentCardComponent,
    ParentCardComponent
  ]
})
export class StudentModule { }