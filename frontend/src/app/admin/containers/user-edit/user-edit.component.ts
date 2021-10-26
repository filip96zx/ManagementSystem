import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { first } from 'rxjs/operators';
import { UserUpdate } from '../../models/userupdate.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  editForm: FormGroup;
  userUpdate: UserUpdate;
  data: Date;
  roles = [{ id: 0, name: 'admin' }, { id: 1, name: 'manager' },
  { id: 2, name: 'pracownik' }, { id: 3, name: 'klient' }];

  constructor(private fbuilder: FormBuilder, private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    this.editForm = this.fbuilder.group({
      id: [''],
      email: [''],
      name: [''],
      surname: [''],
      dateOfBirth: [''],
      phone: [''],
      address: [''],
      city: [''],
      role: [''],
      isActive: [''],
      isLocked: ['']
    });
    this.editForm.controls.id.disable();
    this.editForm.controls.email.disable();
    this.editForm.controls.name.disable();
    this.editForm.controls.surname.disable();
    this.editForm.controls.phone.disable();
    this.editForm.controls.address.disable();
    this.editForm.controls.city.disable();
    this.GetUser(this.route.snapshot.params.id);
  }

  GetUser(id: number) {
    this.adminService.getUserToEdit(id).pipe(first()).subscribe(user => {
      this.data = user.dateOfBirth;
      this.editForm.setValue({
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        address: user.address,
        city: user.city,
        role: user.role,
        isActive: user.isActive,
        isLocked: user.isLocked
      });
    });

  }

  onSubmit() {
    this.userUpdate = {
      id: this.editForm.controls.id.value,
      dateOfBirth: this.editForm.controls.dateOfBirth.value,
      // tslint:disable-next-line: radix
      role: parseInt(this.editForm.controls.role.value),
      isActive: this.editForm.controls.isActive.value,
      isLocked: this.editForm.controls.isLocked.value
    };
    this.adminService.saveUser(this.userUpdate).pipe(first()).subscribe();
  }

}
