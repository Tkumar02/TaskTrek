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

  public users: any[] = [];
  public selectedUser: string = '';
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
    ckcals:0,
    rkcals:0,
    date:'',
    totalInputKcals: 0,
    totalOutputKcals: 0
  }


  public foodArray: any[] = [];
  public bKcals: number = 0;
  public lKcals: number = 0;
  public dKcals: number = 0;
  public sKcals: number = 0;


  ngOnInit(): void{
    this.userService.loadUsers().subscribe(val=>{
      this.users = val
      console.log(this.users)
    })
  }

  //1. Get all the plans for the user
  //2. Put all the dates as a string into an array
  //3. Then query the data to get the kcals from each meal time
  //4. then populate that into a new array

  async loadFood() {
    this.resetForm()
    try{
      this.allData = await firstValueFrom(this.confirmedService.loadAllConfirmedFood(this.selectedUser))
      console.log(this.allData)
      const allDates = []
      for(let i=0;i < this.allData.length; i++){
        if(this.allData[i].ISOdate!='' && !allDates.includes(this.allData[i].ISOdate)){
          allDates.push(this.allData[i].ISOdate)
        }
      }
      console.log(allDates)
      this.dates = allDates.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });
      console.log(this.dates)
      
      for(let i=0;i<this.dates.length;i++){
        let currentData = {...this.foodData}
        currentData.date = this.dates[i];
        const breakfast = await firstValueFrom(this.confirmedService.loadLatestFoodPlan(this.selectedUser,'breakfast',this.dates[i])) as any;
        currentData.bkcals = breakfast[0].kcal;
        this.bKcals += breakfast[0].kcal;
        const lunch = await firstValueFrom(this.confirmedService.loadLatestFoodPlan(this.selectedUser,'lunch',this.dates[i])) as any;
        currentData.lkcals = lunch[0].kcal;
        this.lKcals += lunch[0].kcal
        const dinner = await firstValueFrom(this.confirmedService.loadLatestFoodPlan(this.selectedUser,'dinner',this.dates[i])) as any;
        currentData.dkcals = dinner[0].kcal;
        this.dKcals += dinner[0].kcal
        const snacks = await firstValueFrom(this.confirmedService.loadLatestFoodPlan(this.selectedUser,'snacks',this.dates[i])) as any;
        currentData.skcals = snacks[0].kcal;
        this.sKcals += snacks[0].kcal
        if(this.foodArray.length<=this.dates.length){
          this.foodArray.push(currentData)
          console.log(this.foodArray.length, this.dates.length)
        }
        if(this.foodArray.length<1){
          alert('none')
        }
      }
      console.log(this.foodArray, 'FOODARRAY')
    } catch(error){
      console.error(error)
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
  }
}
