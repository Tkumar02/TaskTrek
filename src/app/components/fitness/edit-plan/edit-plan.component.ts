import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  ){ }

  breakfastBox: boolean = false;
  lunchBox: boolean = false;
  dinnerBox: boolean = false;
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
    mealTime: ''
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

  ngOnInit(): void {
    this.foodTime = this.sds.getFoodTime()
    console.log(this.foodTime)
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

  submitEntry(foodForm:any){
    switch(foodForm){
      case 'breakfast':
        this.foodValue = this.bForm.get('bFood')
        this.kcalValue = this.bForm.get('bKcal')
        this.submitFood.food = this.foodValue.value
        this.submitFood.kcal = this.kcalValue.value
        this.submitFood.mealTime = 'breakfast'
        this.cps.confirmPlan(this.submitFood)
        break;
      case 'lunch':
        this.foodValue = this.lForm.get('lFood')
        this.kcalValue = this.lForm.get('lKcal')
        this.submitFood.food = this.foodValue.value
        this.submitFood.kcal = this.kcalValue.value
        this.submitFood.mealTime = 'lunch'
        this.cps.confirmPlan(this.submitFood)
        break;
      case 'dinner':
        this.foodValue = this.dForm.get('dFood')
        this.kcalValue = this.dForm.get('dKcal')
        this.submitFood.food = this.foodValue.value
        this.submitFood.kcal = this.kcalValue.value
        this.submitFood.mealTime = 'dinner'
        this.cps.confirmPlan(this.submitFood)
        break;
    }
  }
}
