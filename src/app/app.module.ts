import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { WeightComponent } from './components/fitness/weight/weight.component';
import { FitnessHomeComponent } from './components/fitness/fitness-home/fitness-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    WeightComponent,
    FitnessHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
