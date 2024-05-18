import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AddFoodDataService } from 'src/app/services/add-food-data.service';
import { AddUserService } from 'src/app/services/add-user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  
  constructor(private afd:AddFoodDataService, private afAuth: AngularFireAuth, private user: AddUserService) { }
  

  formData = {
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
    memberEmail:''
  }
  public hide = true;
  public users: any;
  public member: any;
  public hideButton = true;

  ngOnInit(): void{
    this.afAuth.authState.subscribe(user=>{
      if(user && user.email=="admin@mail.com"){
        this.hide = false
      }
    })

    this.user.loadUsers().subscribe(val=>{
      this.users = val
    })
  }

  submitPlan(){
    console.log(this.formData)
    this.afAuth.authState.subscribe(user=>{
      if(user && user.email){
        this.formData.submittedBy = user.email;
        this.formData.memberEmail = this.member;
        this.afd.addFood(this.formData)
        //alert('Your plan has been successfully submitted')
        this.formData.breakfastFood = '';
        this.formData.lunchFood = '';
        this.formData.dinnerFood = '';
        this.formData.snacks = '';
        this.formData.breakfastKcal = 0;
        this.formData.lunchKcal = 0;
        this.formData.dinnerKcal = 0;
        this.formData.snacks = '';
        this.formData.resistance = '';
        this.formData.cardio = '';
        this.formData.cardioKcal = 0;
      }
      this.checkComplete()
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
  }

}
