import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	authToken: any;
	user: any;
	employee: any;
	employeeAuthToken: any;

  constructor(
	  private http: Http
  ) { }

  registerUser(user) {
	  let headers = new Headers();
	  headers.append('Content-Type', 'application/json');
	  return this.http.post('http://localhost:3000/api/user/createUser', user, {headers: headers}).map(res => res.json());
  }

  authenticateUser(user) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	return this.http.post('http://localhost:3000/api/user/authenticate/login', user, {headers: headers}).map(res => res.json());
  }

  logoutUser() {
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}

	getUserProfileData() {
		let headers = new Headers();
		this.loadUserToken();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', this.authToken);
		return this.http.get('http://localhost:3000/api/user/userData', {headers: headers}).map(res => res.json());
	}

	createCompany(company) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:3000/api/company/createCompany', company, {headers: headers}).map(res => res.json());
	}

  storeUserData(token, user) {
	  localStorage.setItem('user_id_token', token);
	  localStorage.setItem('user', JSON.stringify(user));
	  this.authToken = token;
	  this.user = user;
  }

  loadUserToken() {
	  const token = localStorage.getItem('user_id_token');
	  this.authToken = token;
  }

  createPaymentMethod(user, payment) {
	  let headers = new Headers();
	  headers.append('Content-Type', 'application/json');
	  return this.http.post('http://localhost:3000/api/user/' + user.id + '/addPayment', payment, {headers: headers}).map(res => res.json());
  }

  registerEmployee(employee, companyCode) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	return this.http.post('http://localhost:3000/api/employee/' + companyCode.toString() + '/createNewEmployee', employee, {headers: headers}).map(res => res.json());
  }

  authenticateEmployee(employee, companyCode) {
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	return this.http.post('http://localhost:3000/api/employee/' + companyCode + '/authenticate/login', employee, {headers: headers}).map(res => res.json());
  }

  storeEmployeeData(token, employee) {
	localStorage.setItem('employee_id_token', token);
	localStorage.setItem('employee', JSON.stringify(employee));
	this.employeeAuthToken = token;
	this.employee = employee;
	}
}
