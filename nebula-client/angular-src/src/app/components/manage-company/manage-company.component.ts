import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

// TODO: Edit Employee Functionality

@Component({
  selector: 'app-manage-company',
  templateUrl: './manage-company.component.html',
  styleUrls: ['./manage-company.component.scss']
})
export class ManageCompanyComponent implements OnInit, OnDestroy {
	company: any;
	companyId: any;
	url: any;
	employees: any;
	inventory: any;
	customers: any;

  constructor(
	  private authService: AuthService,
	  private router: Router
) {
	this.url = this.router.url;
	this.companyId = this.getCompanyIdFromUrl(this.url);
	
	this.authService.getCompanyByCompanyId(this.companyId).subscribe(data => {
		this.company = data;
		this.employees = data.employees;
		this.customers = data.customers;
		this.inventory = data.inventory;
	});

	return this.company, this.companyId, this.url, this.employees, this.inventory, this.customers;
   }

  ngOnInit() {
  }

  ngOnDestroy() {
	  
  }

  onAddEmployeeClick() {
	  this.router.navigate(['user/' + this.company.parentId + '/addEmployee/' + this.company._id]);
  }

  onAddCustomerClick() {
	  this.router.navigate(['user/' + this.company.parentId + '/addCustomer/' + this.company._id])
  }

  onAddItemClick() {
	this.router.navigate(['user/' + this.company.parentId + '/addItem/' + this.company._id])
  }

  onEmployeeClick(event) {
	  let empId = event.target.innerHTML;
	  this.router.navigate(['user/' + this.company.parentId + '/manageEmployee/' + empId]);
  }

  getCompanyIdFromUrl(url) {
	var urls = url.split('/');
	return urls[4];
  }

}
 