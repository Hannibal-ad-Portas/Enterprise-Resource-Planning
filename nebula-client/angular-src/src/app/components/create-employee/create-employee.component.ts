import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
	departments: any;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	department: string;
	position: string;
	salary: string;
	parentCompanyCode: any;
	company: any;

  constructor(
	  private authService: AuthService,
	  private router: Router
  ) {
	  this.departments = [
		  'Human Resources',
		  'IT',
		  'Sales',
		  'Marketing',
		  'Executive',
		  'Management',
		  'Laborer'
	  ]

	  var id = this.getCompanyIdFromUrl(this.router.url);

	  this.authService.getCompanyByCompanyId(id).subscribe(data => {
		this.company = data;
		this.parentCompanyCode = data.companyCode;
	  });

	  return this.departments, this.company, this.parentCompanyCode;
   }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  onCreateEmployeeSubmit() {
	  const employee = {
		  firstName: this.firstName,
		  lastName: this.lastName,
		  email: this.email,
		  password: this.password,
		  department: this.department,
		  position: this.position,
		  salary: this.salary,
		  parentCompanyCode: this.parentCompanyCode
	  }

	  this.authService.registerEmployee(employee, this.parentCompanyCode).subscribe(data => {
		this.router.navigate(['/user/' + this.company.parentId + '/manageCompany/' + this.company._id]);
	  });
	  
  }

  getCompanyIdFromUrl(url) {
	var urls = url.split('/');
	return urls[4];
  }

}
