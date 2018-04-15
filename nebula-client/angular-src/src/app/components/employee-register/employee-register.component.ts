import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.scss']
})
export class EmployeeRegisterComponent implements OnInit {
	email: String;
	password: String;
	firstName: String;
	lastName: String;
	companyCode: String;

  constructor(
	private validateService: ValidateService,
	private flashMessagesService: FlashMessagesService,
	private authService: AuthService,
	private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterEmployeeSubmit() {
	  const employee = {
		  email: this.email,
		  password: this.password,
		  firstName: this.firstName,
		  lastName: this.lastName,
		  parentCompanyCode: this.companyCode
	  }

	  this.authService.registerEmployee(employee, this.companyCode).subscribe(data => {
		this.flashMessagesService.show('Registered', {cssClass: 'alert-success', timeout: 3000});
		this.router.navigate(['employee/login']);
	  });
  }

}
 