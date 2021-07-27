import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordResetForm: FormGroup;
  isResettingPassword = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.passwordResetForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[!?@#$%^&*+=])(?=.*[0-9]).{6,}$')
      ]),
      passwordConfirmation: new FormControl('', [Validators.required])
    }, {
      validators: this.mustMatchValidator
    })
  }

  get password(): AbstractControl {
    return this.passwordResetForm.controls.password;
  }

  get passwordConfirmation(): AbstractControl {
    return this.passwordResetForm.controls.passwordConfirmation;
  }

  private mustMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');

    return password.value === passwordConfirmation.value ? null : { mustMatch: true };
  }

  confirmPasswordReset() {
    this.isResettingPassword = true;
    const code = this.activatedRoute.snapshot.queryParams['oobCode'];
    const newPassword = this.passwordResetForm.controls.password.value;
    this.userService.confirmPasswordReset(code, newPassword)
      .pipe(finalize(() => this.isResettingPassword = false))
      .subscribe(
        () => {
          this.matSnackBar.open('Poprawnie zmieniono hasło!', 'Ok', { duration: 2000 });
          this.router.navigate(['']);
        },
        (error) => {
          this.matSnackBar.open(error, 'Ok', { duration: 5000 });
        }
      )
  }

}
