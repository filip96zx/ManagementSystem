import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserFilter } from '../../models/userfilter.model';
import { UserList } from '../../models/userlist.model';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userFilter: UserFilter;
  userList: UserList[];
  rol: string;
  nameSorted = false; surnameSorted = false; roleSorted = false;

  roles = [{ id: null, name: 'wszyscy' }, { id: 0, name: 'admin' }, { id: 1, name: 'manager' },
  { id: 2, name: 'pracownik' }, { id: 3, name: 'klient' }];

  constructor(private adminService: AdminService, private router: Router) { }


  ngOnInit() {
    this.userFilter = (
      {
        name: null,
        surname: null,
        role: null,
        sort: null,
        sortDesc: null
      }
    );

    this.filterusers();
  }

  filterusers() {
    // tslint:disable-next-line: radix
    this.userFilter.role = parseInt(this.rol);
    this.userFilter.sortDesc = null;
    this.userFilter.sort = null;
    this.adminService.getUsers(this.userFilter).pipe(first()).subscribe((users: UserList[]) =>
      this.userList = users);
  }

  sortName() {
    this.userFilter.sort = 'Name';
    this.nameSorted = true; this.surnameSorted = false; this.roleSorted = false;

    if (this.userFilter.sortDesc == null || this.userFilter.sortDesc === true) {
      this.userFilter.sortDesc = false;
    } else {this.userFilter.sortDesc = true; }
    this.adminService.getUsers(this.userFilter).pipe(first()).subscribe((users: UserList[]) =>
      this.userList = users);
  }
  sortSurName() {
    this.userFilter.sort = 'Surname';
    this.nameSorted = false; this.surnameSorted = true; this.roleSorted = false;

    if (this.userFilter.sortDesc == null || this.userFilter.sortDesc === true) {
      this.userFilter.sortDesc = false;
    } else {this.userFilter.sortDesc = true; }
    this.adminService.getUsers(this.userFilter).pipe(first()).subscribe((users: UserList[]) =>
      this.userList = users);
  }
  sortRole() {
    this.userFilter.sort = 'Role';
    this.nameSorted = false; this.surnameSorted = false; this.roleSorted = true;

    if (this.userFilter.sortDesc == null || this.userFilter.sortDesc === true) {
      this.userFilter.sortDesc = false;
    } else {this.userFilter.sortDesc = true; }
    this.adminService.getUsers(this.userFilter).pipe(first()).subscribe((users: UserList[]) =>
      this.userList = users);
  }

  updateUser(id: number): void {
    this.router.navigate(['admin/useredit/' + id]);
  }



}
