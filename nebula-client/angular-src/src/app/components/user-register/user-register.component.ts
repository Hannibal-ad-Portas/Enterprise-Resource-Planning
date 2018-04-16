import { Component, OnInit, OnDestroy } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
	email: String;
	password: String;
	firstName: String;
	lastName: String;

  constructor(
	  private validateService: ValidateService,
	  private flashMessagesService: FlashMessagesService,
	  private authService: AuthService,
	  private router: Router
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
	  
  }

  onRegisterSubmit() {
	  const user = {
		  email: this.email,
		  password: this.password,
		  firstName: this.firstName,
		  lastName: this.lastName
	  }

	  if(!this.validateService.validateUserRegister(user)) {
		  this.flashMessagesService.show('Please Fill In All Fields', {cssClass: 'alert-danger', timeout: 3000});
	  }

	  if (!this.validateService.emailValidation(user.email)) {
		this.flashMessagesService.show('Please Enter A Valid Email', {cssClass: 'alert-danger', timeout: 3000});
	  }

	  this.authService.registerUser(user).subscribe(data => {
		this.flashMessagesService.show('Registered', {cssClass: 'alert-success', timeout: 3000});
		this.router.navigate(['']);
	  });
  }

}
