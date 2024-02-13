import { Component, EventEmitter, Output } from '@angular/core';
import { User, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  auth = getAuth();
  email: string = '';
  pw: string = '';
  user: User | null = null;
  @Output() sendToApp = new EventEmitter<string>();

  ngOnInit():void {
    onAuthStateChanged(this.auth, (user)=>{
      this.user=user;
      if(user){
        this.sendUser();
      }
    })
  }
  
  signIn(email:string,password:string){
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
    // Signed in
        const user = userCredential.user;
        console.log(user.email)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('ERROR TA')
    });
  }
  
  sendUser(){
    this.sendToApp.emit(this.email)
  }

}
