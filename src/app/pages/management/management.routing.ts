import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Management } from './management.component';
import { SchoolComponent } from './school/school.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentFormComponent } from './student/student-form/student-form.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamFormComponent } from './team/team-form/team-form.component';
import { ClassListComponent } from './class/class-list/class-list.component';
import { ClassFormComponent } from './class/class-form/class-form.component';

const routes: Routes = [
  {
    path: '',
    component: Management,
    children: [
      { path: 'school', component: SchoolComponent },
      { path: 'students', component: StudentListComponent },
      { path: 'students/new', component: StudentFormComponent },
      { path: 'students/:id', component: StudentFormComponent },
      { path: 'students/:id/edit', component: StudentFormComponent },
      { path: 'team', component: TeamListComponent },
      { path: 'team/new', component: TeamFormComponent },
      { path: 'team/:id', component: TeamFormComponent },
      { path: 'team/:id/edit', component: TeamFormComponent },
      { path: 'classes', component: ClassListComponent },
      { path: 'classes/new', component: ClassFormComponent },
      { path: 'classes/:id', component: ClassFormComponent },
      { path: 'classes/:id/edit', component: ClassFormComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
