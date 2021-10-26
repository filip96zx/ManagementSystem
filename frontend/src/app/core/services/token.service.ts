import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

export class TokenService {

  static getToken(): string {
    return localStorage.getItem('jwt-token');
  }
  static setToken(token: string): void {
    return localStorage.setItem('jwt-token', token);
  }

  static removeToken(): void {
    return localStorage.removeItem('jwt-token');
  }

  constructor(private jwtHelperService: JwtHelperService) { }
  getDecodeToken() {
    return this.jwtHelperService.decodeToken(TokenService.getToken())
  }

  isToken() {
    return this.jwtHelperService.tokenGetter() && !this.jwtHelperService.isTokenExpired();
  }
}
