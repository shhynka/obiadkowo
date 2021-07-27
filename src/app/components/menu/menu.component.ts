import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  loggedIn: boolean;
  isLoggingOut = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((authenticated) => {
      this.loggedIn = authenticated;
    });
  }

  logOut(): void {
    this.isLoggingOut = true;
    this.userService.logOut()
      .pipe(finalize(() => this.isLoggingOut = false))
      .subscribe(() => {
        this.loggedIn = false;
        this.router.navigate(['log-in-page']);
      });
  }
}
