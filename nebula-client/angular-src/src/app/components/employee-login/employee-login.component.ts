import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent implements OnInit {
	email: any;
	password: any;
	companyCode: any;

  constructor(
	private validateService: ValidateService,
	private flashMessagesService: FlashMessagesService,
	private authService: AuthService,
	private router: Router
  ) { }

  ngOnInit() {
  }

  onEmployeeLoginSubmit() {
	  let employee = {
		  email: this.email,
		  password: this.password
	  }

	  this.authService.authenticateEmployee(employee, this.companyCode).subscribe(data => {
		this.authService.storeEmployeeData(data.token, data.employee);
		this.router.navigate(['employee/' + data.employee.id]);
	  });
  }

}
