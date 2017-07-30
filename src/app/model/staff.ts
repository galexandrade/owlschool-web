import { Person } from './person';
import { User } from './user';
import { Permission } from "app/model/permission";

export class Staff {
    id;
    person: Person;
    user: User;
    permission: Permission;
    function: string;

    matters: string[] = [];

    _links: any;

    constructor(person?: Person, user?: User, permission?: Permission){
        this.person = !person ? new Person() : person;
        this.user = !user ? new User() : user;
        this.permission = !permission ? new Permission() : permission;
    }
}