import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { trackAPIService } from 'src/app/services/track-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  progressBar = true;

  eyeOrOff: any = 'eye';
  passwordType: any = 'password';
  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private router: Router,
    private apiService: trackAPIService,

  ) {

  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  passwordToggle(event) {
    if (this.eyeOrOff === 'eye') {
      this.eyeOrOff = 'eye-off';
      this.passwordType = 'text';
    } else {
      this.eyeOrOff = 'eye';
      this.passwordType = 'password';
    }
  }



  loginSubmit() {
    console.log(this.loginForm.value.email);
    if (this.loginForm.invalid) {
      this.displayMessage('Please fill all fields', 'danger');

    } else {
      this.progressBar = false;

      let postData = new FormData();
      postData.append("email", this.loginForm.value.email);
      postData.append("password", this.loginForm.value.password);

      this.apiService.userLogin(postData).then((res: any) => {
        if (res.code == 200) {
          console.log(res.status);
          console.log(res.status.token);

          this.progressBar = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('oauthtoken', res.status.token);
          localStorage.setItem('Petsevices', res.status.Petsevices);
          localStorage.setItem('expires_in', res.status.expires_in);
          localStorage.setItem('isAdmin', res.status.isAdmin);
          localStorage.setItem('refresh_token', res.status.refresh_token);
          localStorage.setItem('routeIcon', res.status.routeIcon);
          localStorage.setItem('userID', res.status.userID);

          this.displayMessage('Logged in...', 'primary');
          setTimeout(() => {
            // this.router.navigate(['/']);
            window.location.href = '/';
          }, 1000);
        } else {
          this.progressBar = true;
          this.displayMessage(res?.status, 'danger');
          localStorage.setItem('isLoggedIn', 'true');
        }
      });

    }

  }

  displayMessage(msg, colour) {
    const toast = this.toastController.create({
      message: msg,
      duration: 1500,
      position: 'top',
      animated: true,
      color: colour
    }).then((toastData) => {
      toastData.present();
    });
  }

}
