import { Component, OnInit } from '@angular/core';
import { ProfilemanagerService } from '../../services/profilemanager.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EditProfile } from '../../models/editprofile.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  editForm: FormGroup;
  editProfile: EditProfile;

  constructor(private fbuilder: FormBuilder, private route: ActivatedRoute, private profileManager: ProfilemanagerService) { }

  ngOnInit() {
    this.editForm = this.fbuilder.group({
      name: [''],
      surname: [''],
      city: [''],
      address: [''],
      phone: [''],
    });
    this.getProfile();
  }

  getProfile() {
    this.profileManager.getProfile().pipe(first()).subscribe(profile => {
      this.editForm.setValue({
        name: profile.name,
        surname: profile.surname,
        city: profile.city,
        address: profile.address,
        phone: profile.phone
      });
    });
  }

  onSubmit() {
    this.editProfile = {
      name: this.editForm.controls.name.value,
      surname: this.editForm.controls.surname.value,
      city: this.editForm.controls.city.value,
      address: this.editForm.controls.address.value,
      phone: this.editForm.controls.phone.value
    };
    this.profileManager.saveProfile(this.editProfile).pipe(first()).subscribe();
  }

}
