import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddFoodDataService {

  constructor(private afs:AngularFirestore) { }

  addFood(data:any){
    return this.afs.collection('Food_Plans').add(data)
  }

  addProfile(data:any){
    return this.afs.collection('Profile').add(data)
  }

  loadProfile(email:any){
    return this.afs.collection('Profile',ref=>ref.where('email','==',email).orderBy('date','desc').limit(1)).valueChanges()
  }

  loadPlan(date:any){
    return this.afs.collection('Food_Plans',ref=>ref.where('date','==',date)).valueChanges()
  }

}
