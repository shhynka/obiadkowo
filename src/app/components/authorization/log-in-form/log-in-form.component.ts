import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {

  logInForm: FormGroup;
  isLoggingIn = false;

  constructor(private router: Router, private userService: UserService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get email(): AbstractControl {
    return this.logInForm.controls.email;
  }

  get password(): AbstractControl {
    return this.logInForm.controls.password;
  }

  logIn(): void {
    if (this.logInForm.valid) {
      this.isLoggingIn = true;
      this.userService.logIn(this.email.value, this.password.value)
        .pipe(finalize(() => this.isLoggingIn = false))
        .subscribe(
          () => {
            this.matSnackBar.open('Zalogowano poprawnie!', 'Ok', { duration: 2000 });
            this.router.navigate(['']);
          },
          (error) => {
            this.matSnackBar.open(error, 'Ok', { duration: 5000 });
          });
    }
  }
}
