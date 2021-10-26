import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { Observable } from 'rxjs';
import { EditProfile } from '../models/editprofile.model';
import { ChangePassword } from '../models/changepassword.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilemanagerService {

  constructor(private restService: RestService) { }

  getProfile(): Observable<EditProfile> {
    return this.restService.post<void, EditProfile>('/user/Getprofile', null);
  }

  saveProfile(editData: EditProfile): Observable<string> {
    return this.restService.post<EditProfile, string>('/user/Updateprofile', editData);
  }
  changePassword(changepass: ChangePassword): Observable<string> {
    return this.restService.post<ChangePassword, string>('/user/ChangePassword', changepass);
  }


}
