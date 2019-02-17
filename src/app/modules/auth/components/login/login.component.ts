import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from './../../../../helpers/errorStateMatcher';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { OnLoginAnswer } from '../../interfaces/OnLoginAnswer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // Init form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  /**
   * Обрабочтик события "Submit" формы LogIn
   */
  public onLogin() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.authService.login(email, password).subscribe(
      (data: OnLoginAnswer) => {
        if (data.error) {
          this.messageService.add({severity: 'error', summary: 'Error message', detail: data.message});
        } else {
          this.messageService.add({severity: 'success', summary: 'Success mesage', detail: 'User login is successful!'});
        }
      },
      (error) => this.messageService.add({severity: 'error', summary: 'Server error:', detail: error.message})
    );
  }
}
