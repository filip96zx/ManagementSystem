import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { TokenResponse } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private submitted: boolean;
  error = '';
  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { this.submitted = false; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onFormSubmit() {
    if (!this.submitted && this.loginForm && this.loginForm.valid) {
      this.submitted = true;
      this.authService
        .login(this.loginForm.value)
        .pipe(take(1))
        .subscribe(
          (response: TokenResponse) => {
            this.submitted = false;
            this.router.navigateByUrl('/');
          },

          err => {
            this.submitted = false;
          }
        );
    }
  }
}
