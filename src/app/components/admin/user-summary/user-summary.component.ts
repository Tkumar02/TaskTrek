import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { dayKcals } from 'src/app/interfaces/summaryKcals';
import { AddUserService } from 'src/app/services/add-user.service';
import { ConfirmPlanService } from 'src/app/services/confirm-plan.service';

@Component({
  selector: 'app-user-summary',
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css']
})
export class UserSummaryComponent {

  constructor(
    private userService: AddUserService,
    private confirmedService: ConfirmPlanService,
  ){}

  userEmailFromParent: string = '';

  public users: any[] = [];
  public selectedUser: string = '---Please select a User---';
  public dates: any[] = [];
  public allData: any[] = [];
  public breakfast: any = {};
  public lunch: any = {};
  public dinner: any = {};
  public snacks: any = {};
  public foodData: dayKcals = {
    bkcals:0,
    lkcals:0,
    dkcals:0,
    skcals:0,
    date:'',
    totalInputKcals: 0,
    totalOutputKcals: 0
  }

  public exerciseData = {
    date: '',
    ckcals: 0,
    rkcals: 0
  }
  public foodArray: any[] = [];
  public exerciseArray: any[] = []
  public bKcals: 0;
  public lKcals: 0;
  public dKcals: 0;
  public sKcals: 0;
  public cKcals: 0;
  public rKcals: 0;
  public mealTimes: any[] = [];
  public calendarView = false;

  ngOnInit(): void{
    this.userService.loadUsers().subscribe(val=>{
      this.users = val
      console.log(val)
    })
  }

  viewCalendar(){
    this.userEmailFromParent = this.selectedUser
    this.calendarView = true;
  }

  //1. Get all the plans for the user
  //2. Put all the dates as a string into an array
  //3. Then query the data to get the kcals from each meal time
  //4. then populate that into a new array

  async loadFood() {
    this.resetForm()
    try{
      this.allData = await firstValueFrom(this.confirmedService.loadAllConfirmedFood(this.selectedUser))
      const allDates = []
      for(let i=0;i < this.allData.length; i++){
        if(this.allData[i].ISOdate!='' && !allDates.includes(this.allData[i].ISOdate)){
          allDates.push(this.allData[i].ISOdate)
        }
      }

      this.dates = allDates.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });

      for(let i=0;i < this.dates.length; i++){
          this.mealTimes.push(this.allData[i].mealTime)
      }
      
      for(let i=0;i<this.dates.length;i++){
        let currentData = {...this.foodData}
        currentData.date = this.dates[i];
        let currentExercise = {...this.exerciseData}
        currentExercise.date = this.dates[i]
        console.log(this.dates[i],'date at top')

        const breakfast = await firstValueFrom(this.confirmedService.loadLatestFoodPlan(this.selectedUser,'breakfast',this.dates[i])) as any;
        
        const lunch = await firstValueFrom(this.confirmedService.loadLatestFoodPlan(this.selectedUser,'lunch',this.dates[i])) as any;
        
        const dinner = await firstValueFrom(this.confirmedService.loadLatestFoodPlan(this.selectedUser,'dinner',this.dates[i])) as any;
        
        const snacks = await firstValueFrom(this.confirmedService.loadLatestFoodPlan(this.selectedUser,'snacks',this.dates[i])) as any;
        // currentData.skcals = snacks[0].kcal;
        // this.sKcals += snacks[0].kcal

        //NEW FUNCTION FOR EXERCISE
        const cardio = await firstValueFrom(this.confirmedService.loadLatestExercisePlan(this.selectedUser, 'cardio', this.dates[i])) as any;
        const res = await firstValueFrom(this.confirmedService.loadLatestExercisePlan(this.selectedUser, 'resistance', this.dates[i])) as any;
        console.log(cardio,i,'cardio')
        if(cardio.length==1 && res.length==1){
          currentExercise.ckcals = cardio[0].kcal;
          this.cKcals += cardio[0].kcal;
          currentExercise.rkcals = res[0].kcal;
          this.rKcals = res[0].kcal
        } else {
          currentData.ckcals = 'data incomplete'
          console.log(i,'no data')
        }

        if(this.exerciseArray.length<=this.dates.length){
          this.exerciseArray.push(currentExercise)
        }
        if(this.exerciseArray.length<1){
          alert('No data')
        }
        //NEW FUNCTION ENDS HERE

        
        if(breakfast.length==1 && lunch.length==1 &&dinner.length==1 &&snacks.length==1 ){
          currentData.bkcals = breakfast[0].kcal;
          this.bKcals += breakfast[0].kcal;
          currentData.lkcals = lunch[0].kcal;
          this.lKcals += lunch[0].kcal;
          currentData.dkcals = dinner[0].kcal;
          this.dKcals += dinner[0].kcal;
          currentData.skcals = snacks[0].kcal;
          this.sKcals += snacks[0].kcal;
        } else {
          console.log(breakfast.length, lunch.length, dinner.length, snacks.length,'lengths')
          currentData.bkcals = 'data incomplete'
          currentData.lkcals = 'data incomplete'
          currentData.dkcals = 'data incomplete'
          currentData.skcals = 'data incomplete'
        }
        
        if(this.foodArray.length<=this.dates.length){
          this.foodArray.push(currentData)
        }
        if(this.foodArray.length<1){
          alert('No data')
        }
      }
    } catch(error){
      console.error('An error here within loadFood function',error)
    }
  }

  resetForm(){
    this.foodArray = [];
    this.dates = [];
    this.breakfast = {};
    this.lunch ={};
    this.dinner = {};
    this.snacks = {};
    this.foodData.bkcals = 0
    this.foodData.lkcals = 0
    this.foodData.skcals = 0
    this.foodData.dkcals = 0
    this.bKcals = 0
    this.lKcals = 0
    this.dKcals = 0
    this.sKcals = 0
    this.cKcals = 0
    this.rKcals = 0
  }
}
