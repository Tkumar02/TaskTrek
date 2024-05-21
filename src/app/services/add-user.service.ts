import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  addUser(data:any){
    return this.afs.collection('User').add(data).then(()=>{
      this.toastr.success('Submitted successfully')
      //alert('Successfully Submitted')
    }).catch(error => {
      this.toastr.error('Error: please try again')
    })
  }

  addGoals(data:any){
    return this.afs.collection('Goals').add(data).then(()=>{
      this.toastr.success('Submitted successfully')
    }).catch(error=>{
      this.toastr.error('Error: please try again')
    })
  }

  loadUser(userEmail:any){
    return this.afs.collection('User',ref=>ref.where('userEmail','==',userEmail)).valueChanges()
  }

  loadProfile(userEmail:any){
    return this.afs.collection('Profile',ref=>ref.where('email','==',userEmail)).valueChanges()
  }

  loadUsers(){
    return this.afs.collection('User').valueChanges()
  }
}
