import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private currentUser: User;

  constructor(
    private tokenService: TokenService,
    private authservice: AuthService
  ) {
    this.authservice.currentUser.subscribe(user => {
      this.currentUser = user;
      });
  }

  isLogged() {
    return this.tokenService.isToken();
  }

  logout() {
    TokenService.removeToken();
    localStorage.removeItem('currentUser');
  }

  ngOnInit() {
  }

}
