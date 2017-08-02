import { Component, OnInit } from '@angular/core';
import {GlobalState} from 'app/global.state';
import { Staff } from "app/model/staff";
import { Matter } from "app/model/matter";
import { ToasterService } from "angular2-toaster/angular2-toaster";
import { StaffService } from "app/services/staff.service";
import { MatterService } from "app/services/matter.service";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  private isEditing: boolean = false;

  staffId: number;
  staff: Staff;

  matters: Matter[] = [];
  teachedMatters: Matter[] = [];
  selectedMatter: Matter;

  public form: FormGroup;
  private firstName: AbstractControl;
  private lastName: AbstractControl;
  private birthDay: AbstractControl;
  private email: AbstractControl;
  private function: AbstractControl;
  private selectedMatterForm: AbstractControl;

  private canCreateEvent: AbstractControl;
  private canCreateNews: AbstractControl;
  private canChat: AbstractControl;
  private canUpdateSchool: AbstractControl;
  private canUpdateStudent: AbstractControl;
  private canCreateStudent: AbstractControl;
  private canUpdateClass: AbstractControl;
  private canCreateClass: AbstractControl;

  constructor(private _state:GlobalState,
              private _location: Location,
              private staffService: StaffService,
              private matterService: MatterService,
              private fb:FormBuilder,
              private toaster: ToasterService,
              private route: ActivatedRoute,
              private router: Router) {

    if(route.snapshot.url[route.snapshot.url.length - 1].path === 'edit' || route.snapshot.url[route.snapshot.url.length - 1].path === 'new')
      this.isEditing = true;

    this.form = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      'birthDay': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'function': ['', Validators.compose([Validators.required])],
      'selectedMatterForm': ['', Validators.compose([])],
      'canCreateEvent': ['', Validators.compose([Validators.required])],
      'canCreateNews': ['', Validators.compose([Validators.required])],
      'canChat': ['', Validators.compose([Validators.required])],
      'canUpdateSchool': ['', Validators.compose([Validators.required])],
      'canUpdateStudent': ['', Validators.compose([Validators.required])],
      'canCreateStudent': ['', Validators.compose([Validators.required])],
      'canUpdateClass': ['', Validators.compose([Validators.required])],
      'canCreateClass': ['', Validators.compose([Validators.required])]
    });

    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.birthDay = this.form.controls['birthDay'];
    this.email = this.form.controls['email'];
    this.function = this.form.controls['function'];
    this.selectedMatterForm = this.form.controls['selectedMatterForm'];
    this.canCreateEvent = this.form.controls['canCreateEvent'];
    this.canCreateNews = this.form.controls['canCreateNews'];
    this.canChat = this.form.controls['canChat'];
    this.canUpdateSchool = this.form.controls['canUpdateSchool'];
    this.canUpdateStudent = this.form.controls['canUpdateStudent'];
    this.canCreateStudent = this.form.controls['canCreateStudent'];
    this.canUpdateClass = this.form.controls['canUpdateClass'];
    this.canCreateClass = this.form.controls['canCreateClass'];

    this.staff = new Staff();

    this.staffId = this.route.snapshot.params['id'];
    if(this.staffId) {
      this.staffService.get(this.staffId.toString()).subscribe(
        res => {
          this.staff = res;
          console.log(this.staff);
          this._state.updatePageName("general.menu.team", this.staff.person.firstName);
          this.getMattersTeached();
        }
      );
    }

    this.matterService.get().subscribe(
      res => {
        this.matters = res._embedded.matters;

        if(this.matters.length > 0)
          this.selectedMatter = this.matters[0];
      }
    );
  }

  ngOnInit(): void {
    this._state.updatePageName("general.menu.team");

  }

  onSubmit(values: Object): void{
    this.updateMattersTeached();
    if(this.staffId){
      this.staffService.patch(this.staffId.toString(), this.staff).subscribe(
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
      this.staffService.create(this.staff).subscribe(
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

  addMatter(matter: Matter){
    if(this.teachedMatters.indexOf(matter) < 0)
      this.teachedMatters.push(matter);
  }

  removeMatterTeached(teachedMatter){
    this.teachedMatters.splice(this.teachedMatters.indexOf(teachedMatter), 1);
  }

  getMattersTeached(){
    this.staffService.getMatters(this.staff).subscribe(
      res => {
        this.teachedMatters = res._embedded.matters;
      }
    );
  }

  updateMattersTeached(){
    this.staff.matters = [];
    this.teachedMatters.forEach(matter => {
      this.staff.matters.push(matter._links.self.href);
    });
    console.log(this.staff.matters);
  }

  goBack(){
    this._location.back();
  }

}
