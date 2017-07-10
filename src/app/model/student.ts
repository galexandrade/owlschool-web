import { Person } from './person';
import { ClassRoom } from './classRoom';

export class Student {
    id;
    person: Person;
    classRoom: ClassRoom;

    _links: any;

    constructor(person?: Person){
        this.person = !person ? new Person() : person;
    }
}