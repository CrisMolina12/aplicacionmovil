import { MenuController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/firestore.service';
import { Tarea } from 'src/app/tarea';


@Component({
  selector: 'app-pag4',
  templateUrl: './pag4.page.html',
  styleUrls: ['./pag4.page.scss'],
})
export class Pag4Page implements OnInit {
  arrayColeccionTareas: any = [{
    id: "",
    data: {} as Tarea
   }];
   tareaEditando = {} as Tarea;
   viajes:any[] =[]
   tusviajes:any[] =[]
  
   
  

  constructor(private menu:MenuController,private firestoreService: FirestoreService,private alertController: AlertController) {  this.obtenerListaTareas();}
  idTareaSelec: string;
  ngOnInit() {
    this.obtenerListaTareas;
    

  }
  abrirMenu(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  
  }
  async obtenerListaTareas(){
    this.firestoreService.consultar("tareas").subscribe((resultadoConsultaTareas) => {   
      resultadoConsultaTareas.forEach((datosTarea: any) => {       
        this.viajes.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
      this.tusviajes=this.viajes.filter((viaje:any)=>viaje.data.correo!==localStorage.getItem('email'))
      
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
      // Actualizar la lista completa
      this.obtenerListaTareas();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tarea;
    })}
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Aviso',
        subHeader: 'viaje',
        message: 'Comuniquese con el numero de telefono registrado en el viaje',
        buttons: ['Acepto'],
      });
  
      await alert.present();
    }
    clicBotonModificar() {
      this.firestoreService.actualizar("tareas", this.idTareaSelec, this.tareaEditando).then(() => {
        // Actualizar la lista completa
        this.obtenerListaTareas();
        // Limpiar datos de pantalla
        this.tareaEditando = {} as Tarea;
      })
    }
  
}
