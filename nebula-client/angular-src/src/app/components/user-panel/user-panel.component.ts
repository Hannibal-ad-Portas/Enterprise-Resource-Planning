import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
	user: any;
	companies: any;
	paymentMethods: any;
	settings: any;

  constructor(
	  private authService: AuthService,
	  private router: Router
  ) { 
  }

  ngOnInit() {
	  this.authService.getUserProfileData().subscribe(data => {
		  this.user = data;
		  this.companies = data.companies;
		  this.paymentMethods = data.paymentMethods;
		  this.settings = [
			"Name",
			"Email",
			"Password"
		];
		  return this.user, this.companies, this.paymentMethods, this.settings;
	  },
	 err => {
		 console.log(err);
		 return false;
	 });
  }

  onCreateCompanyClick() {
	  this.router.navigate(['user/' + this.user._id + '/createCompany' ]);
  }

  onCompanyClick(event) {
	  for (let i = 0; i < this.companies.length; i++) {
		  if (this.companies[i].companyName === event.target.innerHTML) {
			  this.router.navigate(['user/' + this.user._id + '/manageCompany/' + this.companies[i]._id]);
		  }
	  }
  }

  onPaymentClick(event) {
	for (let i = 0; i < this.paymentMethods.length; i++) {
		if (this.paymentMethods[i].cardNumber.toString() === event.target.innerHTML) {
			this.router.navigate(['user/' + this.user._id + '/paymentMethod/' + i]);
		}
	}
  }

  onCreatePaymentClick() {
	this.router.navigate(['user/' + this.user._id + '/createPaymentMethod']);
  }

  onSettingClick(event) {
	  for (let i = 0; i < this.settings.length; i++) {
		  if (this.settings[i] === event.target.innerHTML) {
			  if (this.settings[i] === "Name") {
				this.router.navigate(['user/' + this.user._id + '/edit/' + "name"]);
			  }else if (this.settings[i] === "Email") {
				this.router.navigate(['user/' + this.user._id + '/edit/' + "email"]);
			  }else if (this.settings[i] === "Password") {
				this.router.navigate(['user/' + this.user._id + '/edit/' + "password"]);
			  }
		  }
	  }
  }
}
