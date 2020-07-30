export class Employee {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string,
    public dateOfJoining: string,
    public department: string,
    public reportingTo: string,
    public skillSet: string
  ) {}
}
