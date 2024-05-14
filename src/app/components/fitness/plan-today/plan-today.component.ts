import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { completeFoodForm } from 'src/app/interfaces/completeFood';
import { AddFoodDataService } from 'src/app/services/add-food-data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-plan-today',
  templateUrl: './plan-today.component.html',
  styleUrls: ['./plan-today.component.css']
})
export class PlanTodayComponent {
  
  constructor(
    private afAuth:AngularFireAuth,
    private foodService: AddFoodDataService,
    private sds: SharedDataService
  ){}

  currentUserEmail = '';
  todayDate = ''
  todayPlan: any;
  bf: any;
  bfKcal: any;
  lunch: any;
  lunchKcal: any;
  dinner: any;
  dinnerKcal: any;
  completeForm: completeFoodForm = {
    food: '',
    kcal: 0,
    date: new Date(),
    mealTime: ''
  }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user=>{
      if(user && user.email){
        this.currentUserEmail = user.email
      }
      this.todayDate = new Date().toISOString().split('T')[0], new Date()
      this.foodService.loadPlan(this.todayDate, this.currentUserEmail).subscribe(val=>{
        this.todayPlan = val[0]
        this.bf = this.todayPlan.breakfastFood
        this.bfKcal = this.todayPlan.breakfastKcal
        this.lunch = this.todayPlan.lunchFood
        this.lunchKcal = this.todayPlan.lunchKcal
        this.dinner = this.todayPlan.dinnerFood
        this.dinnerKcal = this.todayPlan.dinnerKcal
      })
    })

  }

  sendFoodTime(foodTime: string){
    switch(foodTime){
      case 'breakfast':
        this.sds.setFoodTime('breakfast')
        break;
      case 'lunch':
        this.sds.setFoodTime('lunch')
        break;
      case 'dinner':
        this.sds.setFoodTime('dinner')
    }
  }

  completedFood(foodTime:any){
    switch(foodTime){
      case 'breakfast':
        this.completeForm.food = this.bf
        this.completeForm.kcal = this.bfKcal
        this.completeForm.mealTime = 'breakfast'
        console.log(this.completeForm)
        break;
      case 'lunch':
        this.completeForm.food = this.lunch
        this.completeForm.kcal = this.lunchKcal
        this.completeForm.mealTime = 'lunch'
        console.log(this.completeForm)
        break;
      case 'dinner':
        this.completeForm.food = this.dinner
        this.completeForm.kcal = this.dinnerKcal
        this.completeForm.mealTime = 'dinner'
        console.log(this.completeForm)
        break;
    }
  }

}
