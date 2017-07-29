import { Person } from "./person";

export class Parent{
    person: Person;
    relationship: string;
    _links: any;

    constructor(){
        this.person = new Person();
    }
}