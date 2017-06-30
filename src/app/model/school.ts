export class School {
    id: Number;
    name: string;
    companyRegistration: String;

  constructor(name?: string, companyRegistration?:string) {
    this.name = name;
    this.companyRegistration = companyRegistration;
  }
}