import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss'],
})
export class ClassComponent {
  matters: Matter[] = [];
  scheduleMon: Matter[] = [];
  scheduleTue: Matter[] = [];
  scheduleWed: Matter[] = [];
  scheduleThu: Matter[] = [];
  scheduleFri: Matter[] = [];
  scheduleSat: Matter[] = [];
  scheduleSun: Matter[] = [];
 
    constructor() {
        this.matters.push(new Matter('Math'));
        this.matters.push(new Matter('Portuguese'));
        this.matters.push(new Matter('History'));
        this.matters.push(new Matter('Geography'));
        this.matters.push(new Matter('English'));
        this.matters.push(new Matter('Art'));
        this.matters.push(new Matter('Philosophy'));
        this.matters.push(new Matter('Religion'));
    }
 
    addToScheduleMon($event: any) {
        let newMatter: Matter = $event.dragData;

        if (!this._contain(this.scheduleMon, newMatter)) {        
          this.scheduleMon.push(new Matter(newMatter.name));
        }
    }

    removeScheduleMon(matter: Matter) {
      this.scheduleMon = this.scheduleMon.filter(obj => obj !== matter);
    }
 
    addToScheduleTue($event: any) {
        let newMatter: Matter = $event.dragData;

        if (!this._contain(this.scheduleTue, newMatter)) {
          this.scheduleTue.push(new Matter(newMatter.name));
        }
    }

    removeScheduleTue(matter: Matter) {
      this.scheduleTue = this.scheduleTue.filter(obj => obj !== matter);
    }
 
    addToScheduleWed($event: any) {
        let newMatter: Matter = $event.dragData;

        if (!this._contain(this.scheduleWed, newMatter)) {
          this.scheduleWed.push(new Matter(newMatter.name));
        }
    }

    removeScheduleWed(matter: Matter) {
      this.scheduleWed = this.scheduleWed.filter(obj => obj !== matter);
    }
 
    addToScheduleThu($event: any) {
        let newMatter: Matter = $event.dragData;

        if (!this._contain(this.scheduleThu, newMatter)) {
          this.scheduleThu.push(new Matter(newMatter.name));
        }
    }

    removeScheduleThu(matter: Matter) {
      this.scheduleThu = this.scheduleThu.filter(obj => obj !== matter);
    }
 
    addToScheduleFri($event: any) {
        let newMatter: Matter = $event.dragData;

        if (!this._contain(this.scheduleFri, newMatter)) {
          this.scheduleFri.push(new Matter(newMatter.name));
        }
    }

    removeScheduleFri(matter: Matter) {
      this.scheduleFri = this.scheduleFri.filter(obj => obj !== matter);
    }
 
    addToScheduleSat($event: any) {
        let newMatter: Matter = $event.dragData;

        if (!this._contain(this.scheduleSat, newMatter)) {
          this.scheduleSat.push(new Matter(newMatter.name));
        }
    }

    removeScheduleSat(matter: Matter) {
      this.scheduleSat = this.scheduleSat.filter(obj => obj !== matter);
    }
 
    addToScheduleSun($event: any) {
        let newMatter: Matter = $event.dragData;

        if (!this._contain(this.scheduleSun, newMatter)) {
          this.scheduleSun.push(new Matter(newMatter.name));
        }
    }

    removeScheduleSun(matter: Matter) {
      this.scheduleSun = this.scheduleSun.filter(obj => obj !== matter);
    }

    private _contain(matters: Matter[], matter: Matter): boolean {
      for (var i = 0; i < matters.length; i++) {
          if (matters[i].name === matter.name) {
              return true;
          }
      }
      return false;
    }
}
 
class Matter {
  constructor(public name: string) {}
}
