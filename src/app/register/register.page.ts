import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Coloque un email.' 
      },
      { 
        type: 'pattern', 
        message: 'email no valido.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'se requiere contraseña.' 
      },
      { 
        type: 'minlength', 
        message: 'La longitud de la contraseña debe ser de 6 caracteres.' 
      }
    ]
  };
  

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  signUp(value) {
    this.ionicAuthService.createUser(value)
      .then((response) => {
        this.errorMsg = "";
        this.successMsg = "Nuevo usuario creado.";
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = "";
      })
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario creado',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Continuar',
          
        },
      
      ],
    });

    await alert.present();
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }
  

}