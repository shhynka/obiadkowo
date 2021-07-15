import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm: FormGroup;
  register = false;

  constructor(private router: Router, private userService: UserService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('[a-zA-Z0-9]*')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[!?@#$%^&*+=])(?=.*[0-9]).{6,}$')
      ]),
      passwordConfirmation: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    }, {
      validators: this.mustMatchValidator
    });
  }

  get username(): AbstractControl {
    return this.registrationForm.controls.username;
  }

  get password(): AbstractControl {
    return this.registrationForm.controls.password;
  }

  get passwordConfirmation(): AbstractControl {
    return this.registrationForm.controls.passwordConfirmation;
  }

  get email(): AbstractControl {
    return this.registrationForm.controls.email;
  }

  private mustMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');

    return password.value === passwordConfirmation.value ? null : { mustMatch: true };
  }

  createUser() {
    if (this.registrationForm.valid) {
      this.register = true;
      this.userService.createUser(this.username.value, this.email.value, this.password.value)
        .subscribe(
          () => {
            this.matSnackBar.open('Utworzono nowe konto!', 'Ok', { duration: 2000 });
            this.router.navigate(['']);
          },
          (error) => {
            this.register = false;
            this.matSnackBar.open(error, 'Ok', { duration: 5000 });
          }
        );
    }
  }
}
