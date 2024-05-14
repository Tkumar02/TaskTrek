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
    breakfastKcal: 0,
    lunchKcal: 0,
    dinnerKcal: 0,
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

  showBreakfast(){
    console.log(this.formData)
    this.afAuth.authState.subscribe(user=>{
      if(user && user.email){
        this.formData.submittedBy = user.email;
        this.formData.memberEmail = this.member;
        this.afd.addFood(this.formData)
        this.formData.breakfastFood = '';
        this.formData.lunchFood = '';
        this.formData.dinnerFood = '';
        this.formData.breakfastKcal = 0;
        this.formData.lunchKcal = 0;
        this.formData.dinnerKcal = 0;
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
      this.formData.foodDate
    ){
      this.hideButton=false
    }
  }

}
