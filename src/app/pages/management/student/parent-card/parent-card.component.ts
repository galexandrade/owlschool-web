import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Parent } from "app/model/parent";
import { ParentService } from "app/services/parent.service";

@Component({
  selector: 'parent-card',
  templateUrl: './parent-card.component.html',
  styleUrls: ['./parent-card.component.scss']
})
export class ParentCardComponent implements OnInit {
  @Input()
  parent: Parent;

  @Output()
  parentDeleteEvent = new EventEmitter<Parent>();

  public form:FormGroup;
  private firstName: AbstractControl;
  private relationship: AbstractControl;

  private email: AbstractControl;
  private phone: AbstractControl;
  private job: AbstractControl;

  constructor(private fb:FormBuilder,
              private parentService: ParentService,
              private toaster: ToasterService,) {

    this.form = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      'relationship': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': ['', Validators.compose([Validators.required])],
      'job': ['', Validators.compose([Validators.required])]
    });

    this.firstName = this.form.controls['firstName'];
    this.relationship = this.form.controls['relationship'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.job = this.form.controls['job'];
  }

  ngOnInit() {
  }

  onSubmit(values: Object): void{
    let split = this.parent._links.self.href.split('/');
    let id = split[split.length - 1];
    this.parentService.update(id, this.parent).subscribe(
      (res: any) => this.toaster.pop({
                        type: 'success',
                        body: 'Updated with success!'
                    })
    );
  }

  remove(){
    let split = this.parent._links.self.href.split('/');
    let id = split[split.length - 1];
    this.parentService.delete(id).subscribe(
      res => {
          this.parentDeleteEvent.next(this.parent);
          this.toaster.pop({
                  type: 'success',
                  body: 'Deleted with success!'
              })
      }
    );
  }

}
