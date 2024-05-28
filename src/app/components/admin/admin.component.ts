import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';
import { adminPlan } from 'src/app/interfaces/adminPlan';
import { AddFoodDataService } from 'src/app/services/add-food-data.service';
import { AddUserService } from 'src/app/services/add-user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  
  constructor(
    private afd:AddFoodDataService, 
    private afAuth: AngularFireAuth, 
    private user: AddUserService,
  ) 
    { }
  

  formData: adminPlan = {
    breakfastFood: '',
    foodDate: new Date(),
    lunchFood: '',
    dinnerFood: '',
    snacks: '',
    breakfastKcal: 0,
    lunchKcal: 0,
    dinnerKcal: 0,
    snacksKcal: 0,
    cardio:'',
    cardioKcal: 0,
    resistance: '',
    resistanceKcal: 0,
    submittedBy: '',
    memberEmail:'',
    notesReq: false,
    notes: '',
  }
  public hide = true;
  public users: any;
  public member: any;
  public hideButton = true;
  showNotes = false;
  allPlans: any[] = [];
  plansLoaded = false;
  activePlanIndex: number | null = null;
  confirmDeleteIndex: number = -1;
  dates: any[] = []
  todayDate = '';

  ngOnInit(): void{
    this.afAuth.authState.subscribe(user=>{
      if(user && user.email=="admin@mail.com"){
        this.formData.submittedBy = user.email;
        this.hide = false;
      }
    })

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = today.getFullYear();

    this.todayDate = `${year}-${month}-${day}`;

    this.user.loadUsers().subscribe(val=>{
      this.users = val
    })
  }

  //some hacky stuff coming from admin-edit-plan - fix it later
  async receiveState(data:string){
    if(data == 'deleted'){
      this.dates = []
      await this.loadCompletedPlans()
      alert('Plan successfully deleted')
    }
  }

  assignMember(){
    this.formData.memberEmail = this.member
  }
  async submitPlan(){
    try{
      await(this.assignMember())
      await this.afd.addFood(this.formData)
      await this.resetForm()
      this.dates = []
      this.checkComplete()
    } catch (error) {
      console.error('Admin Error: ', error)
    } 
    finally {
      this.loadCompletedPlans()
    }
  }

  resetForm(){
    this.formData.breakfastFood = '';
      this.formData.lunchFood = '';
      this.formData.dinnerFood = '';
      this.formData.snacks = '';
      this.formData.breakfastKcal = 0;
      this.formData.lunchKcal = 0;
      this.formData.dinnerKcal = 0;
      this.formData.snacksKcal = 0;
      this.formData.resistance = '';
      this.formData.cardio = '';
      this.formData.cardioKcal = 0;
      this.formData.notes = '';
  }

  async loadCompletedPlans(){
    this.dates = [];

    if(this.member !== "-----------")
    this.afd.loadAllPlans(this.member).subscribe(val=>{
      this.allPlans = val
      this.plansLoaded = true;
    })

    const trial1 = await firstValueFrom(this.afd.loadAllPlans(this.member))
    for (let plan of this.allPlans){
      this.dates.push(plan.foodDate)
    }
    this.dates.sort((a: string, b: string) => {
        return new Date(a).getTime() - new Date(b).getTime();
    });

    // this.allPlans = await firstValueFrom(this.afd.loadAllPlans(this.member))
    // this.plansLoaded = true
    // for(let plan of this.allPlans){
    //     this.dates.push(plan.foodDate)
    //   }
    //   this.dates.sort((a: string, b: string) => {
    //     return new Date(a).getTime() - new Date(b).getTime();
    //   });
  }

  checkComplete(){
    if(this.formData.breakfastFood &&
      this.formData.breakfastKcal &&
      this.member &&
      this.formData.lunchFood &&
      this.formData.lunchKcal &&
      this.formData.dinnerFood &&
      this.formData.dinnerKcal &&
      this.formData.foodDate&&
      this.formData.snacks&&
      this.formData.cardio&&
      this.formData.resistance
    ){
      this.hideButton=false
    }
    else{
      this.hideButton = true;
    }
  }

  viewPlan(i:number){
    if(this.activePlanIndex === i){
      this.activePlanIndex = null;
    } else {
      this.activePlanIndex = i;
    }
  }

}
