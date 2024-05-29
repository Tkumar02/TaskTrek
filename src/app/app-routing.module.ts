import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminComponent } from './components/admin/archive/admin.component';
import { UserPlansComponent } from './components/admin/user-plans/user-plans.component';
import { UserProfileComponent } from './components/admin/user-profile/user-profile.component';
import { UserSummaryComponent } from './components/admin/user-summary/user-summary.component';
import { CalendarComponent } from './components/fitness/calendar/calendar.component';
import { EditPlanComponent } from './components/fitness/edit-plan/edit-plan.component';
import { FitnessHomeComponent } from './components/fitness/fitness-home/fitness-home.component';
import { GoalsPrefComponent } from './components/fitness/goals-pref/goals-pref.component';
import { PlanTodayComponent } from './components/fitness/plan-today/plan-today.component';
import { ProfileComponent } from './components/fitness/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'fitness-home', component:FitnessHomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'admin-plan', component:AdminComponent},
  {path:'profile', component: ProfileComponent},
  {path:'plan-today', component:PlanTodayComponent},
  {path:'edit-plan', component:EditPlanComponent},
  {path:'calendar', component: CalendarComponent},
  {path:'goals', component: GoalsPrefComponent},
  {path:'admin-home', component: AdminHomeComponent},
  {path:'admin-user-summary', component: UserSummaryComponent},
  {path:'admin-user-plan', component: UserPlansComponent},
  {path:'admin-user-profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
