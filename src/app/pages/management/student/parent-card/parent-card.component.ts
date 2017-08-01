import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Parent } from "app/model/parent";
import { ParentService } from "app/services/parent.service";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import * as _ from "lodash";

@Component({
  selector: 'parent-card',
  templateUrl: './parent-card.component.html',
  styleUrls: ['./parent-card.component.scss']
})
export class ParentCardComponent implements OnInit {
  @Input()
  parent: Parent;

  @Input()
  editMode: boolean;

  @Output()
  parentDeleteEvent = new EventEmitter<Parent>();

  searchParents: Parent[];
  private searchTerms = new Subject<string>();

  public form:FormGroup;
  private firstName: AbstractControl;
  private lastName: AbstractControl;
  private relationship: AbstractControl;

  private email: AbstractControl;
  private phone: AbstractControl;
  private job: AbstractControl;
  private id: string;

  constructor(private fb:FormBuilder,
              private parentService: ParentService,
              private toaster: ToasterService) {

    this.form = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      'relationship': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': ['', Validators.compose([Validators.required])],
      'job': ['', Validators.compose([Validators.required])]
    });

    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.relationship = this.form.controls['relationship'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.job = this.form.controls['job'];
  }

  ngOnInit() {
    if(this.parent._links){
      let split = this.parent._links.self.href.split('/');
      this.id = split[split.length - 1];
    }

    this.parentService.search(this.searchTerms).subscribe(parents => {
      this.searchParents = parents;
    });
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    if(term !== '')
      this.searchTerms.next(term);
    else{
      this.searchParents = [];
    }
  }

  onSubmit(values: Object): void{
    if(this.id){
      this.parentService.update(this.id, this.parent).subscribe(
        (res: any) => this.toaster.pop({
                          type: 'success',
                          body: 'Updated with success!'
                      })
      );
    }
    else{
      this.parentService.create(this.parent).subscribe(
        (res: any) => {
          this.parent._links = res._links;
          let split = this.parent._links.self.href.split('/');
          this.id = split[split.length - 1];
          console.log(res);
          this.toaster.pop({
                          type: 'success',
                          body: 'Created with success!'
                      })
        }
      );
    }
  }

  remove(){
    this.parentDeleteEvent.emit(this.parent);
  }

  selectParentSearch(parentSearch: Parent){
    this.parent._links = parentSearch._links;
    this.parent.person = parentSearch.person;
    this.parent.relationship = parentSearch.relationship;

    this.searchParents = [];
    let split = this.parent._links.self.href.split('/');
    this.id = split[split.length - 1];
  }

}
