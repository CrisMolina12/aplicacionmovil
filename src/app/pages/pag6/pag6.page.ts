import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pag6',
  templateUrl: './pag6.page.html',
  styleUrls: ['./pag6.page.scss'],
})
export class Pag6Page implements OnInit {

  constructor(private menu:MenuController,) { }

  ngOnInit() {
  }
 abrirMenu(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
}
