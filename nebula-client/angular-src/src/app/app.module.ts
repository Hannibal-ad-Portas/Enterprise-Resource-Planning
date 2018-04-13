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
import { EmployeeRegisterComponent } from './components/employee-register/employee-register.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { CreateCompanyComponent } from './components/create-company/create-company.component';
import { ManageCompanyComponent } from './components/manage-company/manage-company.component';

const routes: Routes = [
	{path: '', component: LandingComponent},
	{path: 'user/register', component: UserRegisterComponent},
	{path: 'user/login', component: UserLoginComponent},
	{path: 'user/:id', component: UserPanelComponent},
	{path: 'user/:id/createCompany', component: CreateCompanyComponent},
	{path: 'user/:id/manageCompany/:companyId', component: ManageCompanyComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    EmployeeRegisterComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserPanelComponent,
    CreateCompanyComponent,
    ManageCompanyComponent,
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
