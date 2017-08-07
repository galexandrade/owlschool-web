import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';

import { Matter } from "app/model/matter";
import { ClassRoomService } from "app/services/classRoom.service";
import { GlobalState } from '../../../../global.state';
import { ClassRoom } from "app/model/classRoom";
import { Staff } from "app/model/staff";
import { Subject } from "rxjs/Subject";
import { StaffService } from "app/services/staff.service";
import { MatterService } from "app/services/matter.service";
import { Observable } from "rxjs/Observable";
import * as _ from "lodash";
import { Student } from "app/model/student";
import { StudentService } from "app/services/student.service";

@Component({
  selector: 'app-class',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
})
export class ClassFormComponent implements OnInit {
  private isEditing: boolean = false;
  classRoom: ClassRoom;
  classRoomId: string;
  classRoomStudents: Student[];
  allMatters: Matter[] = [];
  allTeachers: Staff[] = [];
  selectedTeacher: Staff;
  selectedMatter: Matter;
  mainTeacher: Staff;
  @ViewChild('mainTeacherField') mainTeacherField;
  @ViewChild('studentSearchField') studentSearchField;

  searchTeachers: Staff[];
  private searchTerms = new Subject<string>();

  searchStudents: Student[];
  private searchTermsStudents = new Subject<string>();

  public form: FormGroup;
  private name: AbstractControl;
  private period: AbstractControl;
  private mainTeacherForm: AbstractControl;
  private selectedMatterForm: AbstractControl;
  private mattersTeacher: {matter: Matter, teacher: Staff}[] = [];

  matters: Matter[] = [];
  scheduleMon: Matter[] = [];
  scheduleTue: Matter[] = [];
  scheduleWed: Matter[] = [];
  scheduleThu: Matter[] = [];
  scheduleFri: Matter[] = [];
  scheduleSat: Matter[] = [];
  scheduleSun: Matter[] = [];

  constructor(private _state: GlobalState,
              private _location: Location,
              private fb:FormBuilder,
              private classRoomService: ClassRoomService,
              private staffService: StaffService,
              private matterService: MatterService,
              private studentService: StudentService,
              private toaster: ToasterService,
              private route: ActivatedRoute,
              private router: Router) {
    if(route.snapshot.url[route.snapshot.url.length - 1].path === 'edit' || route.snapshot.url[route.snapshot.url.length - 1].path === 'new')
      this.isEditing = true;

    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      'period': ['', Validators.compose([Validators.required])],
      'mainTeacherForm': ['', Validators.compose([Validators.required])],
      'selectedMatterForm': ['', Validators.compose([])]
    });

    this.name = this.form.controls['name'];
    this.period = this.form.controls['period'];
    this.mainTeacherForm = this.form.controls['mainTeacherForm'];
    this.selectedMatterForm = this.form.controls['selectedMatterForm'];
  }

  ngOnInit() {
    this.staffService.searchTeacher(this.searchTerms).subscribe(staffs => {
      this.searchTeachers = staffs;
    });

    this.studentService.search(this.searchTermsStudents).subscribe(students => {
      this.searchStudents = students;
    });

    this.classRoom = new ClassRoom();
    this.mainTeacher = new Staff();

    this.classRoomId = this.route.snapshot.params['id'];
    if(this.classRoomId) {
      this.classRoomService.get(this.classRoomId.toString()).subscribe(
        res => {
          this.classRoom = res;
          this.classRoom.id = this.classRoomId;

          this._state.updatePageName("general.menu.classes", this.classRoom.name);

          this.classRoom.classRoomTeacherMatters.forEach(classRoomTeacherMatters => {
            let getClassRoomTeacherMatters: Observable<any>[] = [];

            let split = classRoomTeacherMatters._links.teacher.href.split('/');
            let id = split[split.length - 1];
            getClassRoomTeacherMatters.push(this.staffService.get(id));

            split = classRoomTeacherMatters._links.matter.href.split('/');
            id = split[split.length - 1];
            getClassRoomTeacherMatters.push(this.matterService.get(id));

            Observable.forkJoin(getClassRoomTeacherMatters).subscribe(res => {
              this.mattersTeacher.push({
                teacher: res[0],
                matter: res[1]
              });
            })
          });

          this.classRoomService.getMainTeacher(this.classRoom).subscribe(
            res => {
              this.mainTeacher = res;
            }
          );

          this.getClassRoomStudents();

          this.getClassRoomSchedule();
        }
      );
    }

    this.matterService.getTeachedMatters().subscribe(
      res => {
        this.allMatters = res;

        if(this.allMatters.length > 0){
          this.selectedMatter = this.allMatters[0];
          this.searchTeacherByMatter();
        }
      }
    );
  }

  // Push a search term into the observable stream.
  searchTeacher(term: string): void {
    if(term !== '')
      this.searchTerms.next(term);
    else{
      this.searchTeachers = [];
    }
  }

  // Push a search term into the observable stream.
  searchStudent(term: string): void {
    if(term !== '')
      this.searchTermsStudents.next(term);
    else{
      this.searchStudents = [];
    }
  }

  selectTeacherSearch(teacherSearch: Staff){
    this.mainTeacher = teacherSearch;
    this.mainTeacherField.nativeElement.value = this.mainTeacher.person.firstName + ' ' + this.mainTeacher.person.lastName;
    this.searchTeachers = [];
  }

  selectStudentSearch(studentSearch: Student){
    this.searchStudents = [];
    this.classRoomStudents.push(studentSearch);
    this.studentSearchField.nativeElement.value = "";
  }

  addToSchedule($event: any, schedule: Matter[]){
    let newMatter: Matter = $event.dragData;

    if (!this._contain(schedule, newMatter)) {
      schedule.push(newMatter);
    }
  }

  removeSchedule(matter: Matter, schedule: Matter[]): Matter[] {
    console.log(schedule);
    return schedule.filter(obj => obj !== matter);
  }

  private _contain(matters: Matter[], matter: Matter): boolean {
    for (var i = 0; i < matters.length; i++) {
        if (matters[i].matterName === matter.matterName) {
            return true;
        }
    }
    return false;
  }

  onSubmit(values: Object): void{
    this.classRoom.mainTeacher = this.mainTeacher._links.self.href;
    this.updateClassRoomTeacherMatters();
    this.updateSchedule();
    this.updateStudents();
    console.log(this.classRoom);
    if(this.classRoomId){
      this.classRoomService.patch(this.classRoomId.toString(), this.classRoom).subscribe(
        (res: any) => {
          this.toaster.pop({
                          type: 'success',
                          body: 'Updated with success!'
                      });
          this.goBack();
        }
      );
    }
    else{
      this.classRoomService.create(this.classRoom).subscribe(
        (res: any) => {
          this.toaster.pop({
                          type: 'success',
                          body: 'Created with success!'
                      });
          this.goBack();
        }
      );
    }
  }

  searchTeacherByMatter(){
    this.staffService.findTeacherByMatter(this.selectedMatter).subscribe(
      res => {
        this.allTeachers = res;

        if(this.allTeachers.length > 0)
          this.selectedTeacher = this.allTeachers[0];
      }
    );
  }

  addMatterTeacher(){
    let tm = {
      teacher: this.selectedTeacher,
      matter: this.selectedMatter
    };

    let exist: boolean = false;
    this.mattersTeacher.forEach(ele => {
      if(ele.matter._links.self.href === tm.matter._links.self.href &&
         ele.teacher._links.self.href === tm.teacher._links.self.href)
         exist = true;
    });
    if(!exist)
      this.mattersTeacher.push(tm);
    console.log(tm);
  }

  removeMatterTeacher(matterTeacher){
    let idx: number = 0;
    let idx_remove: number;
    this.mattersTeacher.forEach(ele => {
      if(ele.matter._links.self.href === matterTeacher.matter._links.self.href &&
         ele.teacher._links.self.href === matterTeacher.teacher._links.self.href){
        idx_remove = idx;
      }
      idx++;
    });
    this.mattersTeacher.splice(idx_remove, 1);
  }

  updateClassRoomTeacherMatters(){
    this.classRoom.classRoomTeacherMatters = [];

    this.mattersTeacher.forEach(ele => {
      this.classRoom.classRoomTeacherMatters.push({
          classRoom: this.classRoom._links.self.href,
          teacher: ele.teacher._links.self.href,
          matter: ele.matter._links.self.href
      });
    });
  }

  updateSchedule(){
    let mon: string[] = [];
    this.scheduleMon.forEach(matter => {
      mon.push(matter._links.self.href);
    });

    let tue: string[] = [];
    this.scheduleTue.forEach(matter => {
      tue.push(matter._links.self.href);
    });

    let wed: string[] = [];
    this.scheduleWed.forEach(matter => {
      wed.push(matter._links.self.href);
    });

    let thu: string[] = [];
    this.scheduleThu.forEach(matter => {
      thu.push(matter._links.self.href);
    });

    let fri: string[] = [];
    this.scheduleThu.forEach(matter => {
      fri.push(matter._links.self.href);
    });

    let sat: string[] = [];
    this.scheduleSat.forEach(matter => {
      sat.push(matter._links.self.href);
    });

    let sun: string[] = [];
    this.scheduleSun.forEach(matter => {
      sun.push(matter._links.self.href);
    });

    this.classRoom.schedule = {
      monday: mon,
      tuesday: tue,
      wednesday: wed,
      thursday: thu,
      friday: fri,
      saturday: sat,
      sunday: sun
    };
  }

  updateStudents(){
    this.classRoomStudents.forEach(student => {
      this.classRoom.students.push(student._links.self.href);
    });
    console.log(this.classRoom.students);
  }

  getClassRoomSchedule(){
    if(!this.classRoom.schedule._links)
      return;

    let callback = (link, schedule) => {
      let split = link.split('/');
      let id = split[split.length - 1];
      this.matterService.get(id).subscribe(matter => schedule.push(matter));
    };

    if(this.classRoom.schedule._links.monday){
      if(this.classRoom.schedule._links.monday.length)
        this.classRoom.schedule._links.monday.forEach(matterLink => callback(matterLink.href, this.scheduleMon));
      else
        callback(this.classRoom.schedule._links.monday.href, this.scheduleMon);
    }

    if(this.classRoom.schedule._links.tuesday){
      if(this.classRoom.schedule._links.tuesday.length)
        this.classRoom.schedule._links.tuesday.forEach(matterLink => callback(matterLink.href, this.scheduleTue));
      else
        callback(this.classRoom.schedule._links.tuesday.href, this.scheduleTue);
    }

    if(this.classRoom.schedule._links.wednesday){
      if(this.classRoom.schedule._links.wednesday.length)
        this.classRoom.schedule._links.wednesday.forEach(matterLink => callback(matterLink.href, this.scheduleWed));
      else
        callback(this.classRoom.schedule._links.wednesday.href, this.scheduleWed);
    }

    if(this.classRoom.schedule._links.thursday){
      if(this.classRoom.schedule._links.thursday.length)
        this.classRoom.schedule._links.thursday.forEach(matterLink => callback(matterLink.href, this.scheduleThu));
      else
        callback(this.classRoom.schedule._links.thursday.href, this.scheduleThu);
    }

    if(this.classRoom.schedule._links.friday){
      if(this.classRoom.schedule._links.friday.length)
        this.classRoom.schedule._links.friday.forEach(matterLink => callback(matterLink.href, this.scheduleFri));
      else
        callback(this.classRoom.schedule._links.friday.href, this.scheduleFri);
    }

    if(this.classRoom.schedule._links.saturday){
      if(this.classRoom.schedule._links.saturday.length)
        this.classRoom.schedule._links.saturday.forEach(matterLink => callback(matterLink.href, this.scheduleSat));
      else
        callback(this.classRoom.schedule._links.saturday.href, this.scheduleSat);
    }

    if(this.classRoom.schedule._links.sunday){
      if(this.classRoom.schedule._links.sunday.length)
        this.classRoom.schedule._links.sunday.forEach(matterLink => callback(matterLink.href, this.scheduleSun));
      else
        callback(this.classRoom.schedule._links.sunday.href, this.scheduleSun);
    }
  }

  getClassRoomStudents(){
    this.classRoomService.getStudents(this.classRoom).subscribe((res) => {
      this.classRoom.students = [];
      this.classRoomStudents = res._embedded.students;
    });
  }

  removeClassRoomStudent(student: Student){
    let idx_remove: number;
    let idx: number = 0;
    this.classRoomStudents.forEach(stdnt => {
      if(stdnt._links.self.href === student._links.self.href)
        idx_remove = idx;
      idx++;
    });

    this.classRoomStudents.splice(idx_remove, 1);
  }

  goBack(){
    this._location.back();
  }
}
