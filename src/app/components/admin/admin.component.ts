import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AddFoodDataService } from 'src/app/services/add-food-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  
  constructor(private afd:AddFoodDataService, private afAuth: AngularFireAuth) { }

  formData = {
    breakfastFood: '',
    foodDate: new Date(),
    lunchFood: '',
    dinnerFood: '',
    breakfastKcal: 0,
    lunchKcal: 0,
    dinnerKcal: 0,
    userId: '',
  }
  public hide = true;

  ngOnInit(): void{
    this.afAuth.authState.subscribe(user=>{
      if(user && user.email=="admin@mail.com"){
        this.hide = false
      }
    })
  }

  showBreakfast(){
    console.log(this.formData)
    this.afAuth.authState.subscribe(user=>{
      if(user && user.email){
        this.formData.userId = user.email;
        this.afd.addFood(this.formData)
      }
    })
    
    this.formData.breakfastFood = '';
    this.formData.lunchFood = '';
    this.formData.dinnerFood = '';
  }

}
