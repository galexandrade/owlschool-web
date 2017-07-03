import { Address } from './address';
import { Contact } from './contact';

export class Person {
    firstName: string;
    lastName: string;
    birthDay: Date;
    registerNumber: number;
    picture: string;
    address: Address;
    contact: Contact;
}