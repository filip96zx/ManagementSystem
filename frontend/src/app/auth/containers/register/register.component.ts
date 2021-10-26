import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;
  private passwordControl: AbstractControl;
  private submitted: boolean;
  constructor(private fBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) {
    this.submitted = false;
  }

  ngOnInit() {

    this.registerForm = this.fBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, this.comparePasswords]],
    });
    this.passwordControl = this.registerForm.controls.password;

    this.passwordControl.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  comparePasswords: ValidatorFn = (control: AbstractControl) => {
    if (this.registerForm) {
      if (control.errors === null || 'passwordMismatch' in control.errors) {
        if (this.passwordControl.value !== control.value) {
          return { passwordMismatch: true };
        } else {
          return null;
        }
      }
    }
  }

  onFormSubmit() {

    if (!this.submitted && this.registerForm && this.registerForm.valid) {
      this.submitted = true;
      this.authService
        .register(this.registerForm.value)
        .pipe(take(1))
        .subscribe(
          () => {
            this.submitted = false;
            this.router.navigateByUrl('/home');
          },

          () => {
            this.submitted = false;
          }
        );
    }
  }
}
