import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/services/rest.service';
import { Observable } from 'rxjs';
import { UserList } from '../models/userlist.model';
import { UserFilter } from '../models/userfilter.model';
import { UserEdit } from '../models/useredit.model';
import { UserUpdate } from '../models/userupdate.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private restService: RestService) {

  }


  getUsers(filter: UserFilter): Observable<Array<UserList>> {
    return this.restService.post<UserFilter, Array<UserList>>('/admin/users_list', filter);
  }
  getUserToEdit(id: number): Observable<UserEdit> {
    return this.restService.post<number, UserEdit>('/admin/getuser/' + id, null);
  }

  saveUser(user: UserUpdate): Observable<string> {
    return this.restService.post<UserUpdate, string>('/admin/edit_user', user);
  }

}
