import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('f') registerForm: NgForm;

  username: String;
  password: String;
  verifyPassword: String;
  usernameError: boolean;
  passwordError: boolean;
  user: User;

  constructor(private userService: UserService, private router: Router) { }

  register() {

    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.verifyPassword = this.registerForm.value.verifyPassword;

    this.usernameError = false;
    this.passwordError = false;

    if (this.password !== this.verifyPassword) {
      this.passwordError = true;
    } else {
      this.userService.findUserByUsername(this.username)
        .subscribe(
          (user: User) => {
            this.user = user;
            if (!this.user) {
              const newUser = {
                username: this.username,
                password: this.password,
                firstName: '',
                lastName: '',
                email: ''
              };
              this.userService.createUser(newUser)
                .subscribe(
                  (newU: User) => {
                    this.router.navigate(['user', newU._id]);
                  }
                  ,
                  (error: any) => {
                    this.usernameError = true;
                  });
            } else {
              this.usernameError = true;
            }
      }
        );
    }
  }

  ngOnInit() {
  }

}
