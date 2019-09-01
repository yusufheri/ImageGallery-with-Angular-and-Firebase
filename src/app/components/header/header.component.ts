import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService) {
      //  const photo = (auth.userData.photoURL === undefined) ? '/assets/img/image.png' : auth.userData.photoURL;
      //  const name = (auth.userData.displayName === undefined) ? this.auth.userData.email.split('@')[0] : auth.userData.displayName;
  }

  ngOnInit() {
  }

  signOut() {
    this.auth.signOut();
  }

}
