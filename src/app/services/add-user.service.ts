import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private afs: AngularFirestore) { }

  addUser(data:any){
    return this.afs.collection('User').add(data)
  }

  loadUser(userEmail:any){
    return this.afs.collection('User',ref=>ref.where('userEmail','==',userEmail)).valueChanges()
  }

  loadUsers(){
    return this.afs.collection('User').valueChanges()
  }
}
