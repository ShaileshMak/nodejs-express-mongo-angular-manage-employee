import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.less'],
})
export class EmployeeListComponent implements OnInit {
  @Input() employeeList: Array<Employee>;
  @Output() reloadEmployees = new EventEmitter<boolean>();
  @Output() updateEmployee = new EventEmitter<Employee>();
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  editEmployee(employee: Employee) {
    this.updateEmployee.emit({ ...employee });
  }
  deleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id).subscribe(
      (data) => {
        this.reloadEmployees.emit(true);
      },
      (error) => console.log(error)
    );
  }
}
