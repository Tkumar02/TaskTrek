import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FitnessHomeComponent } from './components/fitness/fitness-home/fitness-home.component';
import { WeightComponent } from './components/fitness/weight/weight.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AdminComponent } from './components/admin/admin.component';
import { CalendarComponent } from './components/fitness/calendar/calendar.component';
import { PlanTodayComponent } from './components/fitness/plan-today/plan-today.component';
import { ProfileComponent } from './components/fitness/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    WeightComponent,
    FitnessHomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    CalendarComponent,
    PlanTodayComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    // provideFirebaseApp(() => initializeApp({"projectId":"tasktrek-79ad7","appId":"1:525558836035:web:caceb2946773a2fc605df6","storageBucket":"tasktrek-79ad7.appspot.com","apiKey":"AIzaSyAfhJhhgViwJa1VlaJjUbuVtrErjV4cLXw","authDomain":"tasktrek-79ad7.firebaseapp.com","messagingSenderId":"525558836035"})),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideDatabase(() => getDatabase()),
    // provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }