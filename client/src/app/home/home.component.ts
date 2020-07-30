import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { Observable, from } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  employeeList: Array<Employee> = [];
  managerList: Array<string> = [];
  employee: Employee = this.resetEmployee();
  isUpdate: boolean = false;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.isUpdate = false;
    this.employee = this.resetEmployee();
    this.employeeService.getEmployees().subscribe((data) => {
      this.setEmployeeList(data);
    });
  }

  updateEmployee(employee: Employee) {
    this.employee = employee;
    this.isUpdate = true;
  }

  handleEmployeeAdded(employee: Employee): void {
    this.employeeList.push(employee);
  }

  retsetAddForm() {
    this.employee = this.resetEmployee();
    this.isUpdate = false;
  }

  resetEmployee() {
    return new Employee('', '', '', '', '', '', '');
  }

  private setEmployeeList(data: any) {
    this.employeeList = data.map((employee: any) => {
      return new Employee(
        employee._id,
        employee.firstName,
        employee.lastName,
        employee.dateOfJoining,
        employee.department,
        employee.reportingTo,
        employee.skillSet
      );
    });
    this.managerList = [];
    from(this.employeeList)
      .pipe(map((obj) => `${obj.firstName} ${obj.lastName}`))
      .subscribe((data) => this.managerList.push(data));
  }
}
