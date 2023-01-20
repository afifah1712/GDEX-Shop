import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AlertController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    let loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();

    this.auth.signIn(this.loginForm.value).subscribe(
      user => {
        loading.dismiss();
        let role = user['role'];
        if (role == 'USER' || role == 'UNVERIFIED'||role=='EMPLOYEE' ) {
          console.log(role)

          this.router.navigateByUrl('/user');
        } else if (role == 'ADMIN') {
          this.router.navigateByUrl('/admin');
        }
        // else if (role == 'UNVERIFIED') {
        //   this.router.navigateByUrl('/unverified');
        // }
      },
      async err => {
        loading.dismiss();

        let alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  async openReset() {
    let inputAlert = await this.alertCtrl.create({
      header: 'Reset Password',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset',
          handler: data => {
            this.resetPw(data.email);
          }
        }
      ]
    });
    inputAlert.present();
  }
   
  resetPw(email) {
    this.auth.resetPw(email).then(
      async res => {
        let toast = await this.toastCtrl.create({
          duration: 3000,
          message: 'Success! Check your Emails for more information.'
        });
        toast.present();
      },
      async err => {
        let alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

}
