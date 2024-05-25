import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AddFoodDataService {

  constructor(private afs:AngularFirestore, private toastr: ToastrService) { }

  addFood(data:any){
    return this.afs.collection('Plans').add(data).then(()=>{
      this.toastr.success('Submitted successfully')
      //alert('Successfully Submitted')
    }).catch(error => {
      this.toastr.error('Error: please try again')
    })
  }

  addProfile(data:any){
    return this.afs.collection('Profile').add(data)
  }

  loadProfile(email:any){
    return this.afs.collection('Profile',ref=>ref.where('email','==',email).orderBy('date','desc').limit(1)).valueChanges()
  }

  loadPlan(date:any,email:any){
    return this.afs.collection('Plans',ref=>ref.where('foodDate','==',date).where('memberEmail','==',email)).valueChanges()
  }

  loadAllPlans(user:string){
    return this.afs.collection('Plans', ref=>ref.where('memberEmail','==',user)).valueChanges()
  }

  deletePlan(memberEmail:string, date:string){
    let docID = ''
    this.afs.collection('Plans',ref=>ref
    .where('memberEmail','==',memberEmail)
    .where('foodDate','==',date))
    .get().subscribe(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        docID = doc.id
      })
      console.log('Document ID: ', docID)
      this.afs.collection('Plans').doc(docID).delete()
      .then(()=>{
        this.toastr.success('Plan successfully deleted');
      }).catch((error)=>{
        this.toastr.error('Error, please try again', error)
      })
    })
  }

}
