import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	user: any;

  constructor(
	  private authService: AuthService,
	  private router: Router,
	  private flashMessage: FlashMessagesService
  ) {
	this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit() {
  }

  onLogoutClick() {
	this.authService.logoutUser();
	this.flashMessage.show('logged out', {cssClass: 'alert-success', timeout: 3000});
	this.router.navigate(['user/login']);
	return false;
  }

  goToProfile() {
	  this.router.navigate(['user/' + this.user.id]);
  }

}
