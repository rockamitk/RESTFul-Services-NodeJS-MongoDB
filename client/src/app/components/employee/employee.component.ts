import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
 empList: Array<any>;

 constructor(private empService:EmployeeService) {
 	this.empService.getEmployees()
 	 .subscribe(empList => {
 	 this.empList = empList;
 	 	console.log(this.empList);
 	 })
 }

  ngOnInit() {
  }

}
