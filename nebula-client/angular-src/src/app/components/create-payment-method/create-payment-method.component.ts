import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-create-payment-method',
  templateUrl: './create-payment-method.component.html',
  styleUrls: ['./create-payment-method.component.scss']
})
export class CreatePaymentMethodComponent implements OnInit {
	user: any;
	cardNumber: any;
	cardHolder: any;
	expiration: any;
	cvv: any;

  constructor(
	private authService: AuthService,
	private router: Router,
	private flashMessagesService: FlashMessagesService
  ) { 
	this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
  }

  onCreatePaymentSubmit() {
	  const payment = {
		  cardNumber: this.cardNumber,
		  cardHolder: this.cardHolder,
		  expiration: this.expiration,
		  cvv: this.cvv
	  }

	  this.authService.createPaymentMethod(this.user, payment).subscribe(data => {
		this.flashMessagesService.show('Payment Method Added', {cssClass: 'alert-success', timeout: 3000});
		this.router.navigate(['user/' + this.user.id]);
	});
  }

}
 