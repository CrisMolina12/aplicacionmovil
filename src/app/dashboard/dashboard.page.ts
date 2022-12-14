import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MenuController } from '@ionic/angular';
import { IonicAuthService } from '../ionic-auth.service';
import { FirestoreService } from 'src/app/firestore.service';
import { Tarea } from 'src/app/tarea';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {
  userDetail: string;
  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tarea
   }];
   tareaEditando = {} as Tarea;
   viajes:any[] =[]
   tusviajes:any[] =[]

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,private menu:MenuController,private firestoreService: FirestoreService
  ) { this.obtenerListaTareas();}
  idTareaSelec: string;
  ngOnInit() {
    this.obtenerListaTareas;
    this.ionicAuthService.userDetails().subscribe(response => {
      if (response !== null) {
        this.userDetail = response.email;
        localStorage.setItem('email',response.email)
      } else {
        this.router.navigateByUrl('');
      }
    }, error => {
      console.log(error);
    })
  }
  async obtenerListaTareas(){
    this.firestoreService.consultar("tareas").subscribe((resultadoConsultaTareas) => {   
      resultadoConsultaTareas.forEach((datosTarea: any) => {       
        this.viajes.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      this.tusviajes=this.viajes.filter((viaje:any)=>viaje.data.correo===localStorage.getItem('email'))
      
    });
  
  }
  selecTarea(tareaSelec) {
    console.log("viaje seleccionada: ");
    console.log(tareaSelec);
    this.idTareaSelec = tareaSelec.id;
    this.tareaEditando.nombre = tareaSelec.data.nombre;
    this.tareaEditando.puestos = tareaSelec.data.puestos;
    this.tareaEditando.email = tareaSelec.data.email;
    this.tareaEditando.telefono = tareaSelec.data.telefono;
    this.tareaEditando.hora = tareaSelec.data.hora;
    this.tareaEditando.valor = tareaSelec.data.valor;
    this.tareaEditando.descripcion = tareaSelec.data.descripcion;
    this.tareaEditando.marca = tareaSelec.data.marca;
    this.tareaEditando.patente = tareaSelec.data.patente;
  }
  clicBotonBorrar() {
    this.firestoreService.borrar("tareas", this.idTareaSelec).then(() => {
      
      this.obtenerListaTareas();
      
     this.viajes=[];
    })}
  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }
  abrirMenu(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}