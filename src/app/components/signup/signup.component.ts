import { Component } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  auth = getAuth()
  userEmail: string = '';
  userPassword: string = ''

  signUp(email:string,password:string){
    createUserWithEmailAndPassword(this.auth,email,password)
      .then((userCredential)=>{
        const user = userCredential.user
        console.log('successfully signed up!')
      })
      .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage)
      })
  }
}
