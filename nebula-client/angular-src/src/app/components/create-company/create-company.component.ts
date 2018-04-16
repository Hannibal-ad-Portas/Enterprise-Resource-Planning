import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit, OnDestroy {
	companyName: String;
	subscriptionPlan: any;
	subscriptions: String[];
	user: any;

  constructor(
	  private authService: AuthService,
	  private router: Router,
	  private flashMessagesService: FlashMessagesService
  ) { 
	  this.subscriptions = [
		"free", "non-profit", "basic", "enterprise", "fortune500"
	  ]

	  this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
	  
  }

  onCreateCompanySubmit() {
	  const company = {
		  companyName: this.companyName,
		  subscriptionPlan: this.subscriptionPlan,
		  subscriptionCost: this.setSubCost(this.subscriptionPlan),
		  parentId: this.user.id
	  }

	  this.authService.createCompany(company).subscribe(data => {
		if (data) {
			this.flashMessagesService.show('Company Created', {cssClass: 'alert-success', timeout: 3000});
			this.router.navigate(['user/' + this.user.id]);
		} else {
			this.flashMessagesService.show('Company Not Created', {cssClass: 'alert-danger', timeout: 3000});
			this.router.navigate(['user/' + this.user.id]);
		}
	  });
  }

  setSubCost(subTier) {
	  switch(subTier) {
		case 'free':
			return null;
		case 'non-profit':
			return null;
		case 'basic':
			return 500;
		case 'enterprise':
			return 5000;
		case 'fortune500':
			return 10000;	
	  }
  }

}
