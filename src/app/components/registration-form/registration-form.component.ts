import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      passwordConfirmation: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required)
    }, {
      validators: this.mustMatchValidator
    })
  }

  get username() {
    return this.registrationForm.controls["username"];
  }

  get password() {
    return this.registrationForm.controls["password"];
  }

  get passwordConfirmation() {
    return this.registrationForm.controls["passwordConfirmation"];
  }

  get email() {
    return this.registrationForm.controls["email"];
  }

  private mustMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password");
    const passwordConfirmation = control.get("passwordConfirmation");

    return password.value === passwordConfirmation.value ? null : { mustMatch: true };
  }
}
