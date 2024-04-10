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

}
