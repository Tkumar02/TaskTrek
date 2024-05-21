import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email: string = ''
  constructor(private store: AngularFirestore) { }
  title = 'TaskTrekWeb';
  hide: boolean = false

  emailReceived(value: string) {
    //console.log(value)
    this.email = value
    if (this.email != '') {
      this.hide = true
    }
  }
}
