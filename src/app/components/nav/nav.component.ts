import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { AddUserService } from 'src/app/services/add-user.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(
    private afAuth: AngularFireAuth,
    private afUser: AddUserService,
    private sharedService: SharedDataService,
    private toastr: ToastrService
  ) { }

  disableLoginSignup: boolean = false;
  disableButton: boolean = true;
  disableSignOut: boolean = true;
  userInfo: any;
  userEmail = '';
  userName = '';
  showName: boolean = false;
  userDetails = {
    userName: '',
    userId: '',
    userEmail: '',
    loggedIn: false,
  }
  userRoute = '/fitness-home'

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user && user.email) {
        this.disableLoginSignup = true
        this.disableButton = false;
        this.disableSignOut = false
        this.userEmail = user.email
        if (this.userEmail == 'admin@mail.com') {
          this.userRoute = '/admin-home'
        }
        else {
          this.userRoute = '/fitness-home'
        }
        //console.log(this.userEmail)
        this.afUser.loadUser(this.userEmail).subscribe(val => {
          this.userInfo = val[0];
          if (this.userInfo.userEmail == this.userEmail) {
            this.userName = this.userInfo.firstName.charAt(0).toUpperCase() + this.userInfo.firstName.slice(1);
            this.showName = true
            this.userDetails.userName = this.userName
            this.userDetails.userId = user.uid
            this.userDetails.userEmail = this.userEmail
            this.userDetails.loggedIn = true;
            this.sharedService.setUserDetails(this.userDetails)
          }
        })
      }
    })
  }

  closeNavbar(navbar: any) {
    if (navbar && navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }
  
  signOut() {
    this.afAuth.signOut()
      .then(() => {
        this.toastr.success('You have successfully signed out!')
        this.disableSignOut = true;
        this.disableLoginSignup = false;
        this.userName = '';
        this.userInfo = '';
        this.userEmail = '';
        this.disableButton = true;
      })
  }
}
