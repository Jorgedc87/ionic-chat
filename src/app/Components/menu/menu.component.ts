import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  name: string = ''

  constructor(private menuCtrl: MenuController, public userSer: AuthService) { }

  ngOnInit() {
    this.name = localStorage.getItem('nameALED')
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  logout(){
    this.userSer.logout()
   }

}
