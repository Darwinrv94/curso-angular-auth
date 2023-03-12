import { Component, OnInit } from '@angular/core';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { UsersService } from '@services/users.service';
import { GenericDataSource } from 'src/app/dataSource/genericDataSource';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit  {

  dataSource = new GenericDataSource();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user: User | null = null;

  constructor(
    private userSerive: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSerive.getUsers()
      .subscribe(users => {
        this.dataSource.init(users);
      });

    //this.user = this.authService.getDataUser();

    this.authService.user$
      .subscribe(user => {
        this.user = user;
      })
  }
}
