import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FitnessHomeComponent } from './components/fitness/fitness-home/fitness-home.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'fitness-home', component:FitnessHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
