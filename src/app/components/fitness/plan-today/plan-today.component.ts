import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AddFoodDataService } from 'src/app/services/add-food-data.service';

@Component({
  selector: 'app-plan-today',
  templateUrl: './plan-today.component.html',
  styleUrls: ['./plan-today.component.css']
})
export class PlanTodayComponent {
  
  constructor(
    private afAuth:AngularFireAuth,
    private foodService: AddFoodDataService,
  ){}

  currentUserEmail = '';
  todayDate = ''
  todayPlan: any;

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user=>{
      if(user && user.email){
        this.currentUserEmail = user.email
      }
      this.todayDate = new Date().toISOString().split('T')[0], new Date()
      this.foodService.loadPlan(this.todayDate, this.currentUserEmail).subscribe(val=>{
        this.todayPlan = val[0]
      })
    })
  }
}
