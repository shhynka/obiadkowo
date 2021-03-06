import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  isSendingPasswordResetEmail = false;

  constructor(private userService: UserService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  get email() {
    return this.forgotPasswordForm.controls.email;
  }

  sendPasswordResetEmail(): void {
    this.isSendingPasswordResetEmail = true;
    const email = this.forgotPasswordForm.controls.email.value;
    this.userService.sendPasswordResetEmail(email)
      .pipe(finalize(() => this.isSendingPasswordResetEmail = false))
      .subscribe(
        () => {
          this.matSnackBar.open('Wysłano emaila resetującego hasło', 'Ok', { duration: 2000 });
        },
        (error) => this.matSnackBar.open(error, 'Ok', { duration: 5000 }));
  }

}
