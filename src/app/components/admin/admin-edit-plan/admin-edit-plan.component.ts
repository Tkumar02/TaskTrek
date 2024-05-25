import { Component, Input } from '@angular/core';
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
  notes: string = ''

  confirmDelete = false;

  ngOnInit(): void{
    this.loadPlan()
  }

  loadPlan() {
    this.foodService.loadPlan(this.planDate, this.member)
      .subscribe(val => {
        this.todayPlan = val[0]
        console.log(this.todayPlan)
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
        if (this.todayPlan.notesReq) {
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

  deletePlan(){
    this.foodService.deletePlan(this.member,this.planDate)
  }
}
