import { Component } from '@angular/core';
import { AddUserService } from 'src/app/services/add-user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(
    private userService: AddUserService,
  ) { }

  profiles: any[] = [];
  goals: any[] = [];
  users: any;
  selectedUser: string = '---Users---';
  profileSelected: boolean = false;
  goalsSelected: boolean = false;

  ngOnInit(): void{
    this.userService.loadUsers().subscribe(val=>{
      this.users = val
      console.log(this.users)
    })
  }
  
  selectUser(){
    this.profileSelected = false;
    this.goalsSelected = false;
  }

  loadProfile(){
    this.profileSelected = true
    this.userService.loadProfile(this.selectedUser).subscribe(val=>{
      this.profiles = val
      console.log(this.profiles)
    })
  }

  loadGoals(){
    this.goalsSelected = true
    this.userService.loadGoals(this.selectedUser).subscribe(val=>{
      this.goals = val
      console.log(this.goals)
    })
  }

}
