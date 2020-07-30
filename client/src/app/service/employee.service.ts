import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  _url: string = 'http://localhost:5000/api/employees';
  constructor(private _http: HttpClient) {}

  registerEmployee(employee: Employee): Observable<any> {
    delete employee.id;
    return this._http.post(this._url, employee);
  }

  getEmployees(): Observable<any> {
    return this._http.get(this._url);
  }

  updateEmployee(employee: Employee): Observable<any> {
    const newEmployee: Employee = new Employee(
      employee.id,
      `${employee.firstName}`,
      `${employee.lastName}`,
      new Date().toString(),
      `${employee.department}`,
      `${employee.reportingTo}`,
      `${employee.skillSet}`
    );
    return this._http.put(`${this._url}/${employee.id}`, newEmployee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this._http.delete(`${this._url}/${id}`);
  }
}
