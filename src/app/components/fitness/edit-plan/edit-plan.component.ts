import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { completeExerciseForm } from 'src/app/interfaces/completeExercise';
import { completeFoodForm } from 'src/app/interfaces/completeFood';
import { ConfirmPlanService } from 'src/app/services/confirm-plan.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent {
  
  constructor(
    private sds: SharedDataService,
    private cps: ConfirmPlanService,
    private route: Router,
  ){ }

  breakfastBox: boolean = false;
  lunchBox: boolean = false;
  dinnerBox: boolean = false;
  resBox: boolean = false;
  cardioBox: boolean = false;
  hideBfButton: boolean = true;
  hideLButton: boolean = true;
  hideDButton: boolean = true;
  today = new Date()
  foodTime: string = ''

  foodValue: any
  kcalValue: any

  submitFood: completeFoodForm = {
    food: '',
    kcal: 0,
    date: new Date(),
    mealTime: '',
    method: 'edited',
    user: '',
    userEmail: '',
    ISOdate: new Date().toISOString().split('T')[0]
  }

  submitExercise: completeExerciseForm = {
    type: '',
    exercise: '',
    kcal: 0,
    date: new Date(),
    method: 'edited',
    user: '',
    userEmail: '',
    ISOdate: new Date().toISOString().split('T')[0]
  }

  bForm = new FormGroup({
    bFood: new FormControl('', [Validators.required]),
    bKcal: new FormControl('',[Validators.required]),
    bDate: new FormControl(this.today)
  })
  
  lForm = new FormGroup({
    lFood: new FormControl('', [Validators.required]),
    lKcal: new FormControl('',[Validators.required]),
    lDate: new FormControl(this.today)
  })

  dForm = new FormGroup({
    dFood: new FormControl('', [Validators.required]),
    dKcal: new FormControl('',[Validators.required]),
    dDate: new FormControl(this.today)
  })

  cardioForm = new FormGroup({
    cardio: new FormControl('', [Validators.required]),
    cardioKcal: new FormControl('',[Validators.required]),
    cardioDate: new FormControl(this.today)
  })

  resForm = new FormGroup({
    resistance: new FormControl('', [Validators.required]),
    resKcal: new FormControl('',[Validators.required]),
    resDate: new FormControl(this.today)
  })

  ngOnInit(): void {
    this.foodTime = this.sds.getFoodTime()
    console.log(this.foodTime, 'foodTime')
    const userDetails = this.sds.getUserDetails()
    console.log(userDetails)
    this.submitFood.user = userDetails.userName
    this.submitFood.userEmail = userDetails.userEmail
    this.submitExercise.user = userDetails.userName
    this.submitExercise.userEmail = userDetails.userEmail
  }

  showBox(event:any){
    switch(event.target.id){
      case 'breakfast':
        this.breakfastBox = !this.breakfastBox
        break;
      case 'lunch':
        this.lunchBox = !this.lunchBox
        break;
      case 'dinner':
        this.dinnerBox = !this.dinnerBox
        break;
      case 'resistance':
        this.resBox = !this.resBox
        break;
      case 'cardio':
        this.cardioBox = !this.cardioBox
    }
  }

  get bFood(){
    return this.bForm.get('bFood')
  }

  get bKcal(){
    return this.bForm.get('bKcal')
  }

  get lFood(){
    return this.lForm.get('lFood')
  }

  get lKcal(){
    return this.lForm.get('lKcal')
  }

  get dFood(){
    return this.dForm.get('dFood')
  }

  get dKcal(){
    return this.dForm.get('dKcal')
  }

  get cardio(){
    return this.cardioForm.get('cardio')
  }

  get cardioKcal(){
    return this.cardioForm.get('cardioKcal')
  }

  get resistance(){
    return this.resForm.get('resistance')
  }

  get resKcal(){
    return this.resForm.get('resKcal')
  }

  

  submitEntry(foodForm:any){
    switch(foodForm){
      case 'breakfast':
        this.foodValue = this.bForm.get('bFood')
        this.kcalValue = this.bForm.get('bKcal')
        this.submitFood.food = this.foodValue.value
        this.submitFood.kcal = this.kcalValue.value
        this.submitFood.mealTime = 'breakfast'
        this.cps.confirmFood(this.submitFood)
        break;
      case 'lunch':
        this.foodValue = this.lForm.get('lFood')
        this.kcalValue = this.lForm.get('lKcal')
        this.submitFood.food = this.foodValue.value
        this.submitFood.kcal = this.kcalValue.value
        this.submitFood.mealTime = 'lunch'
        this.cps.confirmFood(this.submitFood)
        this.lForm.reset();
        break;
      case 'dinner':
        this.foodValue = this.dForm.get('dFood')
        this.kcalValue = this.dForm.get('dKcal')
        this.submitFood.food = this.foodValue.value
        this.submitFood.kcal = this.kcalValue.value
        this.submitFood.mealTime = 'dinner'
        this.cps.confirmFood(this.submitFood)
        break;
      case 'cardio':
        this.foodValue = this.cardioForm.get('cardio')
        this.kcalValue = this.cardioForm.get('cardioKcal')
        this.submitExercise.type = 'Cardio'
        this.submitExercise.kcal = this.kcalValue.value
        this.submitExercise.exercise = this.foodValue.value
        this.cps.confirmExercise(this.submitExercise)
        break;
      case 'resistance':
        this.foodValue = this.dForm.get('dFood')
        this.kcalValue = this.dForm.get('dKcal')
        this.submitExercise.type = 'Resistance'
        this.submitExercise.kcal = this.kcalValue.value
        this.submitExercise.exercise = this.foodValue.value
        this.cps.confirmExercise(this.submitExercise)
        break;
    }
    this.route.navigate(['/plan-today'])
  }
}
