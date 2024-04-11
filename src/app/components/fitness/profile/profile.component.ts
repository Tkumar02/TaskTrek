import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AddFoodDataService } from 'src/app/services/add-food-data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(
    private shareData: SharedDataService, 
    private userData: AddFoodDataService,
    private datePipe: DatePipe) {}
  
  userDetails: any
  showName: boolean = false
  weight: number = 0;
  height: number = 0;
  gender: string = '';
  age: number = 0;
  bmr: number = 0;
  profileExists: boolean = false;
  currentWeight = 0;
  currentBMR = '';
  existingProfile: any;
  lastUpdated: any;
  profile = {
    name: '',
    email: '',
    id: '',
    weight:0,
    bmr: 0,
    date: new Date()
  }

  ngOnInit(): void{
    this.userDetails = this.shareData.getUserDetails()
    //console.log(this.userDetails, 'profile component')
    this.profile.name = this.userDetails.userName;
    this.profile.email = this.userDetails.userEmail;
    this.profile.id = this.userDetails.userId;
    this.profile.date = new Date()
    if(this.userDetails.userName){
      this.showName = true;
    }
    //console.log(this.userDetails.userEmail)
    this.userData.loadProfile(this.userDetails.userEmail).subscribe(val=>{
      this.existingProfile = val[0]
      if(this.existingProfile){
        this.profileExists = true;
        this.currentWeight = this.existingProfile.weight;
        this.currentBMR = this.existingProfile.bmr.toFixed(0);
        let latestDate= this.existingProfile.date.seconds*1000;
        this.lastUpdated = this.datePipe.transform(latestDate,'dd/MM/yy')
      }
    })
  }

  calculateBMR(){
    if(this.gender=='m'){
      this.bmr = 88.362 + (13.397 * this.weight) + (4.799*this.height) - (5.677*this.age)
    }
    if(this.gender=='f'){
      this.bmr = (447.593 + (9.247 * this.weight) + (3.098*this.height) - (4.330*this.age))
    }
    this.profile.weight = this.weight
    this.profile.bmr = this.bmr
    this.userData.addProfile(this.profile)
  }

  showForm(){
    this.profileExists = false
  }
}
