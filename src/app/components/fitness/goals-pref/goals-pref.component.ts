import { Component } from '@angular/core';
import { goalsForm } from 'src/app/interfaces/goals';
import { AddUserService } from 'src/app/services/add-user.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-goals-pref',
  templateUrl: './goals-pref.component.html',
  styleUrls: ['./goals-pref.component.css']
})
export class GoalsPrefComponent {

  constructor(
    private userService: AddUserService,
    private sds: SharedDataService,
  ) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails() {
    const userDetails = this.sds.getUserDetails()
    this.goalsData.userName = userDetails.userName
    this.goalsData.userEmail = userDetails.userEmail
  }

  goalsData: goalsForm = {
    goals: '',
    foodPref: '',
    exercisePref: '',
    date: new Date(),
    userName: '',
    userEmail: '',
  }

  disableButton: boolean = true;

  checkButton() {
    if (
      this.goalsData.goals.length > 10 && 
      this.goalsData.foodPref.length > 10 && 
      this.goalsData.exercisePref.length > 10) 
      {
        this.disableButton = false;
      }
    else {
      this.disableButton = true;
    }
  }

  

  resetForm() {
    this.goalsData.goals = '';
    this.goalsData.foodPref = '';
    this.goalsData.exercisePref = '';
  }

  async addData(data: any) {
    try {
      this.getUserDetails();
      await this.userService.addGoals(data);
      this.resetForm();
      this.checkButton();
    } catch (error) {
      console.error('Goals ERROR: ', error)
    }
  }
}
