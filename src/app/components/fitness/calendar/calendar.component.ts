import { Component } from '@angular/core';
import { AddUserService } from 'src/app/services/add-user.service';
import { ConfirmPlanService } from 'src/app/services/confirm-plan.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  maxDate: string = '';
  selectedDate: any;
  lastBreakfast: any;
  lastLunch: any;
  lastDinner: any;
  lastSnacks: any;
  resistance: any;
  cardio: any;
  userEmail: string = '';
  userDetails: any;
  userProfile: any;
  showPlan: boolean = false;

  constructor(
    private cps: ConfirmPlanService,
    private sds: SharedDataService,
    private userService: AddUserService,
  ) { }

  ngOnInit(): void {
    const today = new Date();
    //today.setDate(today.getDate()-1) 
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Add leading zero
    const day = ('0' + today.getDate()).slice(-2); // Add leading zero

    this.maxDate = `${year}-${month}-${day}`;

    this.userDetails = this.sds.getUserDetails()
    this.userEmail = this.userDetails.userEmail
  }

  getDetails() {
    this.cps.loadLatestFoodPlan(this.userEmail, 'breakfast', this.selectedDate).subscribe(val => {
      this.lastBreakfast = val[0]
    })
    this.cps.loadLatestFoodPlan(this.userEmail, 'lunch', this.selectedDate).subscribe(val => {
      this.lastLunch = val[0]
    })
    this.cps.loadLatestFoodPlan(this.userEmail, 'dinner', this.selectedDate).subscribe(val => {
      this.lastDinner = val[0]
    })
    this.cps.loadLatestFoodPlan(this.userEmail, 'snacks', this.selectedDate).subscribe(val => {
      this.lastSnacks = val[0]
    })
    this.cps.loadLatestExercisePlan(this.userEmail, 'resistance', this.selectedDate).subscribe(val => {
      this.resistance = val[0]
    })
    this.cps.loadLatestExercisePlan(this.userEmail, 'cardio', this.selectedDate).subscribe(val => {
      this.cardio = val[0]
    })
    this.userService.loadProfile(this.userEmail).subscribe(val => {
      this.userProfile = val[0]
      //console.log(this.userProfile)
      this.showPlan = true;
    })
  }
}
