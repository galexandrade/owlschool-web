import { Person } from './person';

export class Student {
    id;
    person: Person;

    constructor(person?: Person){
        this.person = !person ? new Person() : person;
    }
}