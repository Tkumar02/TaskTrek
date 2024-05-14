import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private userDetails: any;
  private foodTime: any;

  setUserDetails(data:any){
    this.userDetails = data;
  }

  getUserDetails(){
    return this.userDetails
  }

  setFoodTime(data:any){
    this.foodTime = data
  }

  getFoodTime(){
    return this.foodTime
  }
}
