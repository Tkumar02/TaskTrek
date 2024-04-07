import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { FitnessHomeComponent } from './components/fitness/fitness-home/fitness-home.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'fitness-home', component:FitnessHomeComponent},
  {path: 'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path: 'admin', component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
