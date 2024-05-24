import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private router: Router, private toastr: ToastrService) {}

  auth = getAuth();
  email: string = '';
  pw: string = '';
  user: User | null = null;

  ngOnInit():void {
    onAuthStateChanged(this.auth, (user)=>{
      this.user=user;
      if(user){
        console.log(user);
      }
    })
  }
  
  signIn(email:string,password:string){
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
    // Signed in
        const user = userCredential.user;
        if(user.email=='admin@mail.com'){
          this.router.navigate(['/admin-home'])
        }
        else(
          this.router.navigate(['/fitness-home'])
        )
        this.toastr.success('You have successfully logged in')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('ERROR TA')
      alert('There was an error, please try again')
      this.email = ''
      this.pw = ''
    });
  }
}
