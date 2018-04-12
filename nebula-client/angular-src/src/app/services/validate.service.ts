import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateUserRegister(user) {
	  if (user.email === undefined || user.password === undefined || user.firstName === undefined || user.lastName === undefined) {
		  return false;
	  } else {
		  return true;
	  }
  }

  emailValidation(email) {
	  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return regex.test(email);
}

}
