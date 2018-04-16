import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit, OnDestroy {
	name: string;
	description: string;
	sku: string;
	amount: string;
	measurment: string;
	url: any;
	companyId: any;
	company: any;

  constructor(
	  private router: Router,
	  private authService: AuthService
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

  onCreateItemSubmit() {
	let amount = {
		amt: this.amount,
		measurment: this.measurment
	}

	let newItem = {
		name: this.name,
		description: this.description,
		sku: this.sku,
		amount: amount,
	}

	this.authService.createItem(newItem, this.companyId).subscribe(data => {
		this.router.navigate(['user/' + this.company.parentId + '/manageCompany/' + this.companyId]);
	});
  }

  getCompanyIdFromUrl(url) {
	var urls = url.split('/');
	return urls[4];
  }
}
