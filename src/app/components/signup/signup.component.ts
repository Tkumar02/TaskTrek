import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { AddUserService } from 'src/app/services/add-user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService:AddUserService, private route: Router) { }

  auth = getAuth()
  userPassword: string = '';
  confirmPassword: string = '';

  userForm = {
    userEmail:'',
    firstName: ''
  }

  signUp(email:string,password:string){
    if(this.confirmPassword==this.userPassword)
    {createUserWithEmailAndPassword(this.auth,email,password)
      .then((userCredential)=>{
        const user = userCredential.user
        console.log('successfully signed up!')
        this.route.navigate(['/profile'])
        this.userService.addUser(this.userForm)
      })
      .catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
        alert(errorMessage)
        this.userForm.firstName = '';
        this.userForm.userEmail = '';
        this.userPassword = '';
        this.confirmPassword = '';
      })
    
    //alert('You have successfully signed up')
    
    }
    else{
      alert('Passwords do not match')
      this.userPassword = '';
      this.confirmPassword = '';
    }
  }
}
