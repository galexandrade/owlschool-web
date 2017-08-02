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

@Component({
  selector: 'app-class',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
})
export class ClassFormComponent implements OnInit {
  private isEditing: boolean = false;
  classRoom: ClassRoom;
  classRoomId: string;
  allMatters: Matter[] = [];
  allTeachers: Staff[] = [];
  selectedTeacher: Staff;
  selectedMatter: Matter;
  mainTeacher: Staff;
  @ViewChild('mainTeacherField') mainTeacherField;

  searchTeachers: Staff[];
  private searchTerms = new Subject<string>();

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

    this.matters.push(new Matter('Math'));
    this.matters.push(new Matter('Portuguese'));
    this.matters.push(new Matter('History'));
    this.matters.push(new Matter('Geography'));
    this.matters.push(new Matter('English'));
    this.matters.push(new Matter('Art'));
    this.matters.push(new Matter('Philosophy'));
    this.matters.push(new Matter('Religion'));

    this.classRoom = new ClassRoom();
    this.mainTeacher = new Staff();

    this.classRoomId = this.route.snapshot.params['id'];
    if(this.classRoomId) {
      this.classRoomService.get(this.classRoomId.toString()).subscribe(
        res => {
          this.classRoom = res;
          this._state.updatePageName("general.menu.classes", this.classRoom.name);

          this.classRoom.classRoomTeacherMatters.forEach(classRoomTeacherMatters => {
            let getClassRoomTeacherMatters: Observable<any>[] = [];

            let split = classRoomTeacherMatters._links.teacher.href.split('/');
            let id = split[split.length - 1];
            getClassRoomTeacherMatters.push(staffService.get(id));

            split = classRoomTeacherMatters._links.matter.href.split('/');
            id = split[split.length - 1];
            getClassRoomTeacherMatters.push(matterService.get(id));

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

  ngOnInit() {
    this.staffService.searchTeacher(this.searchTerms).subscribe(staffs => {
      this.searchTeachers = staffs;
    });
  }

  // Push a search term into the observable stream.
  searchTeacher(term: string): void {
    if(term !== '')
      this.searchTerms.next(term);
    else{
      this.searchTeachers = [];
    }
  }

  selectTeacherSearch(teacherSearch: Staff){
    this.mainTeacher = teacherSearch;
    this.mainTeacherField.nativeElement.value = this.mainTeacher.person.firstName + ' ' + this.mainTeacher.person.lastName;
    this.searchTeachers = [];
  }

  addToScheduleMon($event: any) {
      let newMatter: Matter = $event.dragData;

      if (!this._contain(this.scheduleMon, newMatter)) {
        this.scheduleMon.push(new Matter(newMatter.matterName));
      }
  }

  removeScheduleMon(matter: Matter) {
    this.scheduleMon = this.scheduleMon.filter(obj => obj !== matter);
  }

  addToScheduleTue($event: any) {
      let newMatter: Matter = $event.dragData;

      if (!this._contain(this.scheduleTue, newMatter)) {
        this.scheduleTue.push(new Matter(newMatter.matterName));
      }
  }

  removeScheduleTue(matter: Matter) {
    this.scheduleTue = this.scheduleTue.filter(obj => obj !== matter);
  }

  addToScheduleWed($event: any) {
      let newMatter: Matter = $event.dragData;

      if (!this._contain(this.scheduleWed, newMatter)) {
        this.scheduleWed.push(new Matter(newMatter.matterName));
      }
  }

  removeScheduleWed(matter: Matter) {
    this.scheduleWed = this.scheduleWed.filter(obj => obj !== matter);
  }

  addToScheduleThu($event: any) {
      let newMatter: Matter = $event.dragData;

      if (!this._contain(this.scheduleThu, newMatter)) {
        this.scheduleThu.push(new Matter(newMatter.matterName));
      }
  }

  removeScheduleThu(matter: Matter) {
    this.scheduleThu = this.scheduleThu.filter(obj => obj !== matter);
  }

  addToScheduleFri($event: any) {
      let newMatter: Matter = $event.dragData;

      if (!this._contain(this.scheduleFri, newMatter)) {
        this.scheduleFri.push(new Matter(newMatter.matterName));
      }
  }

  removeScheduleFri(matter: Matter) {
    this.scheduleFri = this.scheduleFri.filter(obj => obj !== matter);
  }

  addToScheduleSat($event: any) {
      let newMatter: Matter = $event.dragData;

      if (!this._contain(this.scheduleSat, newMatter)) {
        this.scheduleSat.push(new Matter(newMatter.matterName));
      }
  }

  removeScheduleSat(matter: Matter) {
    this.scheduleSat = this.scheduleSat.filter(obj => obj !== matter);
  }

  addToScheduleSun($event: any) {
      let newMatter: Matter = $event.dragData;

      if (!this._contain(this.scheduleSun, newMatter)) {
        this.scheduleSun.push(new Matter(newMatter.matterName));
      }
  }

  removeScheduleSun(matter: Matter) {
    this.scheduleSun = this.scheduleSun.filter(obj => obj !== matter);
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

  goBack(){
    this._location.back();
  }
}
