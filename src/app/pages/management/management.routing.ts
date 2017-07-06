import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Management } from './management.component';
import { SchoolComponent } from './school/school.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentFormComponent } from './student/student-form/student-form.component';
import { TeamComponent } from './team/team.component';
import { StaffComponent } from './staff/staff.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassComponent } from './class/class.component';

const routes: Routes = [
  {
    path: '',
    component: Management,
    children: [
      { path: 'school', component: SchoolComponent },
      //{ path: 'students', loadChildren: './students/student.module#StudentModule' },
      { path: 'students', component: StudentListComponent },
      { path: 'students/new', component: StudentFormComponent },
      { path: 'students/:id', component: StudentFormComponent },
      { path: 'team', component: TeamComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'class', component: ClassComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
