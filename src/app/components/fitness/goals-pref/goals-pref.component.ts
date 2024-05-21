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

  getUserDetails() {
    const userDetails = this.sds.getUserDetails()
    this.goalsData.userName = userDetails.userName
    this.goalsData.userEmail = userDetails.userEmail
  }

  goalsData: goalsForm = {
    goals: '',
    preferences: '',
    date: new Date(),
    userName: '',
    userEmail: '',
  }

  disableButton: boolean = true;

  checkButton() {
    if (this.goalsData.goals.length > 10 && this.goalsData.preferences.length > 10) {
      this.disableButton = false;
    }
    else {
      this.disableButton = true;
    }
  }

  resetForm() {
    this.goalsData.goals = '';
    this.goalsData.preferences = '';
  }

  async addData(data: any) {
    try {
      await this.getUserDetails();
      await this.userService.addGoals(data);
      await this.resetForm();
      await this.checkButton();
    } catch (error) {
      console.error('Goals ERROR: ', error)
    }
  }
}
