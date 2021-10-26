import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { ProfilemanagerService } from '../../services/profilemanager.service';
import { ActivatedRoute } from '@angular/router';
import { ChangePassword } from '../../models/changepassword.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  private passwordControl: AbstractControl;
  private passwordData: ChangePassword;
  constructor(private fbuilder: FormBuilder, private route: ActivatedRoute, private profileManager: ProfilemanagerService) { }

  ngOnInit() {
    this.changePasswordForm = this.fbuilder.group({
      oldPassword: [''],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, , this.comparePasswords]]
    });

    this.passwordControl = this.changePasswordForm.controls.newPassword;

    this.passwordControl.valueChanges.subscribe(() => {
      this.changePasswordForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  comparePasswords: ValidatorFn = (control: AbstractControl) => {
    if (this.changePasswordForm) {
      if (control.errors === null || 'passwordMismatch' in control.errors) {
        if (this.passwordControl.value !== control.value) {
          return { passwordMismatch: true };
        } else {
          return null;
        }
      }
    }
  }

  onSubmit() {
    this.passwordData = {
      oldPassword: this.changePasswordForm.controls.oldPassword.value,
      newPassword: this.changePasswordForm.controls.newPassword.value
    };
    this.profileManager.changePassword(this.passwordData).pipe(first()).subscribe();
  }

}
