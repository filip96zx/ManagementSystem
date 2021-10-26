import { Injectable } from '@angular/core';
import { LoginRequest, TokenResponse, ResetPasswordRequest } from '../models/login.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RestService } from 'src/app/core/services/rest.service';
import { TokenService } from 'src/app/core/services/token.service';
import { RegisterRequest } from '../models/register.model';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private restService: RestService,
              private tokenservice: TokenService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(userAuth: LoginRequest): Observable<TokenResponse> {
    return this.restService.post<LoginRequest, TokenResponse>('/user/login', userAuth)
      .pipe(
        tap(
          (resp: TokenResponse) => {
            TokenService.setToken(resp.token);
            localStorage.setItem('currentUser', JSON.stringify(this.tokenservice.getDecodeToken()));
            this.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser')));
          }
        )
      );
  }
  register(registerUser: RegisterRequest): Observable<void> {
    return this.restService.post<RegisterRequest, void>('/user/register', registerUser);
  }
  restartPassword(email: ResetPasswordRequest): Observable<void> {
    return this.restService.post<ResetPasswordRequest, void>('/user/sendrestartpassword', email);
  }
}
