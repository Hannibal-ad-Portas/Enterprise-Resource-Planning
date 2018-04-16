import { Component, OnInit, OnDestroy } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
	email: String;
	password: String;

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

  onLoginSubmit() {
	  const user = {
		  email: this.email,
		  password: this.password
	  }

	  this.authService.authenticateUser(user).subscribe(data => {
		this.authService.storeUserData(data.token, data.user);
		this.router.navigate(['user/' + data.user.id]);
		if (data.success) {
			this.authService.storeUserData(data.token, data.user);
			this.flashMessagesService.show('Logged In', {cssClass: 'alert-success', timeout: 3000});
			this.router.navigate(['user/' + data.user.id]);
		} else {
			this.flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
			this.router.navigate(['user/login']);
		}
	  });
  }

}
