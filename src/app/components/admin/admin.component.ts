import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  ngOnInit(): void{
    this.afAuth.authState.subscribe(user=>{
      if(user && user.email=="admin@mail.com"){
        this.formData.submittedBy = user.email;
        this.hide = false;
      }
    })

    this.user.loadUsers().subscribe(val=>{
      this.users = val
    })
  }


  assignMember(){
    this.formData.memberEmail = this.member
  }
  async submitPlan(){
    try{
      await(this.assignMember())
      await this.afd.addFood(this.formData)
      await this.resetForm()
      this.checkComplete()
    } catch (error) {
      console.error('Admin Error: ', error)
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

  loadCompletedPlans(){
    if(this.member !== "-----------")
    console.log('changed', this.member)
    this.afd.loadAllPlans(this.member).subscribe(val=>{
      this.allPlans = val
      console.log(val)
      this.plansLoaded = true;
    })
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

  // deletePlan(date:string,i:number){
  //     this.activePlanIndex = null;
  //     this.afd.deletePlan(this.member,date)
  // }

  // checkDelete(i:number){
  //   this.confirmDeleteIndex = i
  // }

}
