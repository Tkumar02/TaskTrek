import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map, take, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPlanService {

  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) { }

  confirmFood(data:any){
    return this.afs.collection('Confirmed-Food').add(data).then(()=>{
      this.toastr.success('Submitted successfully')
      //alert('Successfully Submitted')
    }).catch(error => {
      alert('Error: please try again')
    })
  } 

  confirmExercise(data:any){
    return this.afs.collection('Confirmed-Exercise').add(data).then(()=>{
      this.toastr.success('Submitted successfully')
      //alert('Successfully Submitted')
    }).catch(error => {
      alert('Error: please try again')
    })
  }

  loadLatestFoodPlan(email:any, mealTime:string, date:string){
    return this.afs.collection('Confirmed-Food',ref=>
      ref.where('userEmail','==',email)
        .where('ISOdate','==',date)
        .where('mealTime','==',mealTime)
        .orderBy('date','desc')
        .limit(1)
      ).valueChanges().pipe(
        catchError(error=>{
          console.error('nope', error);
          return throwError(()=>'Error')
        })
      )
  }

  loadLatestExercisePlan(email:any, exercise:string, date:string){
    return this.afs.collection('Confirmed-Exercise',ref=>ref.where('userEmail','==',email).where('ISOdate','==',date).where('type','==',exercise).orderBy('date','desc').limit(1)).valueChanges()
  }

  //not used this yet (updatePlan) - but to think about when this should be used
  updatePlan(email:string, date:string, data: any){
    const plansCollection = this.afs.collection('Confirmed-Food', ref=> 
      ref.where('email', '==',email).where('date','==',date)
    );

    plansCollection.snapshotChanges().pipe(
      take(1),
      map(actions=>actions.map(a=>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id
        return {id, data};
      }))
    ).subscribe((plans: any)=>{
      if (plans.length > 0) {
        const planId = plans[0].id;
        this.afs.collection('Confirmed-Food').doc(planId).update(data)
      }
    })
  }

}
