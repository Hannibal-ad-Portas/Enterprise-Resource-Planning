import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { ManageCompanyComponent } from './components/manage-company/manage-company.component';
import { PaymentInfoPanelComponent } from './components/payment-info-panel/payment-info-panel.component';
import { CreatePaymentMethodComponent } from './components/create-payment-method/create-payment-method.component';
import { EditUserSettingsNameComponent } from './components/edit-user-settings-name/edit-user-settings-name.component';
import { EditUserSettingsEmailComponent } from './components/edit-user-settings-email/edit-user-settings-email.component';
import { EditUserSettingsPasswordComponent } from './components/edit-user-settings-password/edit-user-settings-password.component';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeePanelComponent } from './components/employee-panel/employee-panel.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { ManageEmployeeComponent } from './components/manage-employee/manage-employee.component';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CreateItemComponent } from './components/create-item/create-item.component';

const routes: Routes = [
	{path: '', component: LandingComponent},
	{path: 'user/register', component: UserRegisterComponent},
	{path: 'user/login', component: UserLoginComponent},
	{path: 'user/:id', component: UserPanelComponent},
	{path: 'user/:id/createCompany', component: CreateCompanyComponent},
	{path: 'user/:id/manageCompany/:companyId', component: ManageCompanyComponent},
	{path: 'user/:id/addEmployee/:companyId', component: CreateEmployeeComponent},
	{path: 'user/:id/addCustomer/:companyId', component: CreateCustomerComponent},
	{path: 'user/:id/addItem/:companyId', component: CreateItemComponent},
	{path: 'user/:id/paymentMethod/:index', component: PaymentInfoPanelComponent},
	{path: 'user/:id/createPaymentMethod', component: CreatePaymentMethodComponent},
	{path: 'user/:id/edit/name', component: EditUserSettingsNameComponent},
	{path: 'user/:id/edit/email', component: EditUserSettingsEmailComponent},
	{path: 'user/:id/edit/password', component: EditUserSettingsPasswordComponent},
	{path: 'employee/login', component: EmployeeLoginComponent},
	{path: 'employee/:id', component: EmployeePanelComponent},
	{path: 'user/:id/manageEmployee/:employeeId', component: ManageEmployeeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserPanelComponent,
    CreateCompanyComponent,
    ManageCompanyComponent,
    PaymentInfoPanelComponent,
    CreatePaymentMethodComponent,
	EditUserSettingsNameComponent,
	EditUserSettingsEmailComponent,
	EditUserSettingsPasswordComponent,
	EmployeeLoginComponent,
	EmployeePanelComponent,
	CreateEmployeeComponent,
	ManageEmployeeComponent,
	CreateCustomerComponent,
	CreateItemComponent,
  ],
  imports: [
	BrowserModule,
	RouterModule.forRoot(routes),
	FormsModule,
	FlashMessagesModule,
	HttpModule
  ],
  providers: [ValidateService, FlashMessagesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
