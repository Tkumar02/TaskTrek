import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { completeExerciseForm } from 'src/app/interfaces/completeExercise';
import { completeFoodForm } from 'src/app/interfaces/completeFood';
import { AddFoodDataService } from 'src/app/services/add-food-data.service';
import { ConfirmPlanService } from 'src/app/services/confirm-plan.service';
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
    private sds: SharedDataService,
    private cp: ConfirmPlanService
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
  cardio: string = '';
  cardioKcal: number = 0;
  resistance: string = '';
  resistanceKcal: number = 0;

  completeForm: completeFoodForm = {
    food: '',
    kcal: 0,
    date: new Date(),
    mealTime: '',
    method:'original',
    user: '',
    userEmail: '',
    ISOdate: new Date().toISOString().split('T')[0],
  }

  completeExercise: completeExerciseForm = {
    exercise: '',
    kcal: 0,
    date: new Date(),
    type: '',
    method:'original',
    user: '',
    userEmail: '',
    ISOdate: new Date().toISOString().split('T')[0],
  }

  ngOnInit(): void {

    this.afAuth.authState.subscribe(user=>{
      if(user && user.email){
        this.currentUserEmail = user.email
        this.completeForm.userEmail = this.currentUserEmail
        const userDetails = this.sds.getUserDetails()
        this.completeForm.user = userDetails.userName
        this.completeExercise.user = userDetails.userName
        this.completeExercise.userEmail = userDetails.userEmail
      }
      this.todayDate = new Date().toISOString().split('T')[0], new Date()
      console.log(this.todayDate, typeof(this.todayDate,'TA LOOK HERE'))
      this.foodService.loadPlan(this.todayDate, this.currentUserEmail).subscribe(val=>{
        this.todayPlan = val[0]
        this.bf = this.todayPlan.breakfastFood
        this.bfKcal = this.todayPlan.breakfastKcal
        this.lunch = this.todayPlan.lunchFood
        this.lunchKcal = this.todayPlan.lunchKcal
        this.dinner = this.todayPlan.dinnerFood
        this.dinnerKcal = this.todayPlan.dinnerKcal
        this.cardio = this.todayPlan.cardio
        this.cardioKcal = this.todayPlan.cardioKcal
        this.resistance = this.todayPlan.resistance
        this.resistanceKcal = this.todayPlan.resistanceKcal
      })
    })

  }

  sendID(foodTime: string){
    switch(foodTime){
      case 'breakfast':
        this.sds.setFoodTime('breakfast')
        break;
      case 'lunch':
        this.sds.setFoodTime('lunch')
        break;
      case 'dinner':
        this.sds.setFoodTime('dinner')
        break;
      case 'resistance':
        this.sds.setFoodTime('resistance')
        break;
      case 'cardio':
        this.sds.setFoodTime('cardio')
    }
  }

  completedFood(foodTime:any){
    switch(foodTime){
      case 'breakfast':
        this.completeForm.food = this.bf
        this.completeForm.kcal = this.bfKcal
        this.completeForm.mealTime = 'breakfast'
        this.cp.confirmFood(this.completeForm)
        break;
      case 'lunch':
        this.completeForm.food = this.lunch
        this.completeForm.kcal = this.lunchKcal
        this.completeForm.mealTime = 'lunch'
        console.log(this.completeForm)
        this.cp.confirmFood(this.completeForm)
        break;
      case 'dinner':
        this.completeForm.food = this.dinner
        this.completeForm.kcal = this.dinnerKcal
        this.completeForm.mealTime = 'dinner'
        console.log(this.completeForm)
        this.cp.confirmFood(this.completeForm)
        break;
      case 'cardio':
        console.log('hi')
        this.completeExercise.exercise = this.cardio
        this.completeExercise.kcal = this.cardioKcal
        this.completeExercise.type = 'cardio'
        console.log(this.completeExercise)
        this.cp.confirmExercise(this.completeExercise)
        break;
      case 'resistance':
        this.completeExercise.exercise = this.resistance
        this.completeExercise.kcal = this.resistanceKcal
        this.completeExercise.type = 'resistance'
        console.log(this.completeExercise)
        this.cp.confirmExercise(this.completeExercise)
        break;
    }
  }

}
