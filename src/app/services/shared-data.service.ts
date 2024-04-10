import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private userDetails: any;

  setUserDetails(data:any){
    this.userDetails = data;
  }

  getUserDetails(){
    return this.userDetails
  }
}
