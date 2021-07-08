import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss']
})
export class LogInFormComponent implements OnInit {

  logInForm: FormGroup;
  loggingIn = false;

  constructor(private auth: AngularFireAuth, private router: Router, private userService: UserService) { }

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

  logIn() {
    if (this.logInForm.valid) {
      const email = this.logInForm.controls.email.value;
      const password = this.logInForm.controls.password.value;
      this.loggingIn = true;
      this.auth.signInWithEmailAndPassword(email, password).then(() => {
        this.router.navigate(['']);
      });
    }
  }

  sendPasswordResetEmail() {
    const email = this.logInForm.controls.email.value;
    this.auth.sendPasswordResetEmail(email);
  }

}
