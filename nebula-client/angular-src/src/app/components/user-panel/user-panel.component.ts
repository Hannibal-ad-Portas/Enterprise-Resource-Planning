import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {
	user: Object;
	companies: any;

  constructor(
	  private authService: AuthService,
	  private router: Router
  ) { }

  ngOnInit() {
	  this.authService.getUserProfileData().subscribe(data => {
		  this.user = data;
		  this.companies = data.companies;
		  return this.user, this.companies;
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
}
