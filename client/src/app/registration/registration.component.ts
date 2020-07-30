import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
})
export class RegistrationComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}
  @ViewChild('itemForm') registrationForm: NgForm;

  @Output() onEmployeeAdded = new EventEmitter<Employee>();
  @Output() reloadEmployees = new EventEmitter<boolean>();

  @Input() employee: Employee = new Employee('', '', '', '', '', '', '');
  @Input() managers: Array<string> = [];
  handleOnSumbit() {
    this.addEmployee();
  }

  addEmployee() {
    this.employeeService.registerEmployee(this.employee).subscribe(
      (data: any) => {
        this.onEmployeeAdded.emit(
          new Employee(
            data._id,
            data.firstName,
            data.lastName,
            data.dateOfJoining,
            data.department,
            data.reportingTo,
            data.skillSet
          )
        );
        this.managers.push(`${data.firstName} ${data.lastName}`);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
