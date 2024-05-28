import { Component, EventEmitter, Input, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AddFoodDataService } from 'src/app/services/add-food-data.service';

@Component({
  selector: 'app-admin-edit-plan',
  templateUrl: './admin-edit-plan.component.html',
  styleUrls: ['./admin-edit-plan.component.css']
})
export class AdminEditPlanComponent {

  constructor(
    private foodService: AddFoodDataService,
  ) {  }
  @Input() planDate: string;
  @Input() member: string;
  @Output() sendState = new EventEmitter<string>();

  plans: any[];
  currentUserEmail = '';
  todayDate = '';
  errorLoading: boolean = false;
  today = new Date();
  todayPlan: any;
  bf: any;
  bfKcal: any;
  lunch: any;
  lunchKcal: any;
  dinner: any;
  dinnerKcal: any;
  snacks: any;
  snacksKcal: any;
  cardio: string = '';
  cardioKcal: number = 0;
  resistance: string = '';
  resistanceKcal: number = 0;
  notes: string = '';
  notesReq: false;

  confirmDelete = false;
  message= ''
  prePlans: any;
  postPlans: any;

  ngOnInit(): void{
    this.loadPlan()
  }

  loadPlan() {
    this.foodService.loadPlan(this.planDate, this.member)
      .subscribe(val => {
        this.todayPlan = val[0]
        console.log(this.todayPlan,this.planDate, 'here?')
        this.bf = this.todayPlan.breakfastFood
        this.bfKcal = this.todayPlan.breakfastKcal
        this.lunch = this.todayPlan.lunchFood
        this.lunchKcal = this.todayPlan.lunchKcal
        this.dinner = this.todayPlan.dinnerFood
        this.dinnerKcal = this.todayPlan.dinnerKcal
        this.snacks = this.todayPlan.snacks
        this.snacksKcal = this.todayPlan.snacksKcal
        this.cardio = this.todayPlan.cardio
        this.cardioKcal = this.todayPlan.cardioKcal
        this.resistance = this.todayPlan.resistance
        this.resistanceKcal = this.todayPlan.resistanceKcal
        this.notesReq = this.todayPlan.notesReq
        if (this.notesReq) {
          this.notes = this.todayPlan.notes
        }
        else {
          this.notes = '';
        }
      }
    )
  }
  
  checkDelete(){
    this.confirmDelete = !this.confirmDelete;
  }

  //VERY HACKY WAY TO DO THIS - FIX IT IN THE FUTURE
  async confirmDeletePlan(): Promise<void>{
    this.prePlans = await firstValueFrom(this.foodService.loadAllPlans(this.member))
    return new Promise((resolve,reject)=>{
      try{
      this.foodService.deletePlan(this.member,this.planDate)
          setTimeout(()=>{
            resolve();
          },1000)
        }
        catch(error) {
          reject(error)
        }
    })
  }

  async deletePlan(){
    await this.confirmDeletePlan()
    this.postPlans = await firstValueFrom(this.foodService.loadAllPlans(this.member))
    console.log('done?',this.prePlans.length, this.postPlans.length)
    this.message = 'deleted'
    this.sendState.emit(this.message)
  }
}
