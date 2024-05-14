import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPlanService {

  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) { }

  confirmPlan(data:any){
    return this.afs.collection('Confirmed-Plan').add(data).then(()=>{
      this.toastr.success('Submitted successfully')
    })
  }

}
