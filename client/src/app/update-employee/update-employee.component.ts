import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.less'],
})
export class UpdateEmployeeComponent implements OnInit, OnChanges {
  updateForm: FormGroup;
  @Output() addEmployeeEmitter = new EventEmitter<boolean>();
  @Output() reloadEmployeesEmitter = new EventEmitter<boolean>();

  @Input() employee: Employee = new Employee('', '', '', '', '', '', '');
  @Input() managers: Array<string> = [];
  @Input() isUpdate: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      firstName: [this.employee.firstName, Validators.required],
      lastName: [this.employee.lastName, Validators.required],
      dateOfJoining: [this.employee.dateOfJoining, Validators.required],
      department: [this.employee.department, Validators.required],
      reportingTo: [this.employee.reportingTo, Validators.required],
      skillSet: [this.employee.skillSet, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('employee' in changes) {
      this.updateForm.patchValue({ ...changes.employee.currentValue });
    }
  }
  updateEmployee() {
    this.employeeService
      .updateEmployee(
        new Employee(
          this.employee.id,
          this.updateForm.get('firstName').value,
          this.updateForm.get('lastName').value,
          this.updateForm.get('dateOfJoining').value,
          this.updateForm.get('department').value,
          this.updateForm.get('reportingTo').value,
          this.updateForm.get('skillSet').value
        )
      )
      .subscribe(
        (data: any) => {
          this.reloadEmployeesEmitter.emit(true);
          this.updateForm.reset();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addEmployee() {
    this.addEmployeeEmitter.emit(true);
  }

  get firstName() {
    return this.updateForm.get('firstName');
  }

  get lastName() {
    return this.updateForm.get('lastName');
  }

  get dateOfJoining() {
    return this.updateForm.get('dateOfJoining');
  }

  get department() {
    return this.updateForm.get('department');
  }

  get reportingTo() {
    return this.updateForm.get('reportingTo');
  }

  get skillSet() {
    return this.updateForm.get('skillSet');
  }
}
