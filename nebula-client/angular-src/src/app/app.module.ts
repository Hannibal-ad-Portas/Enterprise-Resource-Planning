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

const routes: Routes = [
	{path: '', component: LandingComponent},
	{path: 'user/register', component: UserRegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    EmployeeRegisterComponent,
    UserRegisterComponent,
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
