import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-restartpassword',
  templateUrl: './restartpassword.component.html',
  styleUrls: ['./restartpassword.component.scss']
})
export class RestartpasswordComponent implements OnInit {

  private submitted: boolean;
  error = '';
  restartPasswordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { this.submitted = false; }

  ngOnInit() {
    this.restartPasswordForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  onFormSubmit() {
    if (!this.submitted && this.restartPasswordForm && this.restartPasswordForm.valid) {
      this.submitted = true;
      this.authService
        .restartPassword(this.restartPasswordForm.value)
        .pipe(take(1))
        .subscribe(
          () => {
            this.submitted = false;
            this.router.navigateByUrl('/');
          },

          () => {
            this.submitted = false;
          }
        );
    }


}}
