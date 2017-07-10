import { Address } from './address';
import { Contact } from './contact';

export class Person {
    firstName: string;
    lastName: string;
    birthDay: Date;
    registerNumber: number;
    job: string;
    picture: string;
    address: Address;
    contact: Contact;

    constructor(address?: Address){
        this.address = !address ? new Address() : address;
    }
}