import { Component } from '@angular/core';
import { AddFoodDataService } from 'src/app/services/add-food-data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private shareData: SharedDataService, private addProfile: AddFoodDataService) {}
  
  userDetails: any
  showName: boolean = false
  weight: number = 0;
  height: number = 0;
  gender: string = '';
  age: number = 0;
  bmr: number = 0;
  profile = {
    name: '',
    id: '',
    weight:0,
    bmr: 0
  }

  ngOnInit(): void{
    this.userDetails = this.shareData.getUserDetails()
    this.profile.name = this.userDetails.userName;
    this.profile.id = this.userDetails.userId;
    if(this.userDetails.userName){
      this.showName = true;
    }
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
    this.addProfile.addProfile(this.profile)
  }
}
