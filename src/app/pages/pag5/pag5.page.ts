import { IonicAuthService } from './../../ionic-auth.service';
import { DashboardPage } from './../../dashboard/dashboard.page';
import { AlertController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/firestore.service';
import { Tarea } from 'src/app/tarea';
import { FormGroup, Validators } from '@angular/forms';

import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-pag5',
  templateUrl: './pag5.page.html',
  styleUrls: ['./pag5.page.scss'],
})
export class Pag5Page implements OnInit {
  userDetail: string;
  

   tareaEditando: Tarea;
   
   
   viaje =new FormGroup({
    name: new FormControl("",Validators.required),
    descripcion: new FormControl("",Validators.required) ,
    hora: new FormControl("",Validators.required) ,
    puestos: new FormControl("",Validators.required) ,
    telefono: new FormControl("",Validators.required) ,
    valor: new FormControl("",Validators.required),
    patente: new FormControl("",Validators.required) ,
    marca: new FormControl("",Validators.required) 

   }) 
  
 
 


  constructor(private firestoreService: FirestoreService,private menu:MenuController,private alertController: AlertController,private router: Router,) {
    // Crear una tarea vacía
    this.tareaEditando = {} as Tarea;
  } 
  clicBotonInsertar() {
    this.firestoreService.insertar("tareas", {...this.tareaEditando, correo: localStorage.getItem('email') }).then(() => {
      console.log('viaje creada correctamente!');
      this.tareaEditando= {} as Tarea;
    }, (error) => {
      console.error(error);
    });
  }

  ngOnInit() {
    
   
  }
  abrirMenu(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Viaje creado correctamente',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Continuar',
          
        },
      
      ],
    });

    await alert.present();
  }
  gohome() {
    this.router.navigateByUrl('/dashboard');
  }
  
}
