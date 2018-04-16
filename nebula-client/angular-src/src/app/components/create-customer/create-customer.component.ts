import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit, OnDestroy {
	name: string;
	address: string;
	url: any;
	companyId: any;
	company: any;

  constructor(
	  private authService: AuthService,
	  private router: Router
  ) { 
	this.url = this.router.url;
	this.companyId = this.getCompanyIdFromUrl(this.url);

	this.authService.getCompanyByCompanyId(this.companyId).subscribe(data => {
		this.company = data;
	});
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  onCreateCustomerSubmit() {
	  const newCustomer = {
		  name: this.name,
		  address: this.address
	  }

	  this.authService.createCustomer(newCustomer, this.companyId).subscribe(data => {
		this.router.navigate(['/user/' + this.company.parentId + '/manageCompany/' + this.company._id]);
	  })
  }

  getCompanyIdFromUrl(url) {
	var urls = url.split('/');
	return urls[4];
  }

}
