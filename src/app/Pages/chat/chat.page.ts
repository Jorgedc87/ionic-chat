import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Mensaje } from 'src/app/interfaces/mensaje';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  mensajes: Mensaje[]
  chatArea: string = ''
  userId = localStorage.getItem('idALED')
  error = {active: false,mensaje: ""}
  
  constructor(private menuCtrl: MenuController, public chatServ: ChatService) { }

  ngOnInit() {
    this.chatServ.traeMensajes()
    .subscribe( (mensajes:Mensaje[]) => {
      this.mensajes =  mensajes
      console.log(mensajes)
      console.log(mensajes.sort(this.msj))
    }) 
  }

  enviaMensaje(){
    let data = {
      mensaje: this.chatArea,
      id: this.userId,
      name: localStorage.getItem('nameALED'),
      timestamp: new Date()
    }

    this.chatServ.enviaMensaje(data)
      .then( () => console.log('Enviado'))
      .catch( (err) => console.error('Error al enviar', err) )

    this.chatArea = ''
    this.error.active = false;
    this.error.mensaje = ""
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

  ordenaMensajes(){
    console.log(this.mensajes.sort(this.msj));

  }

  msj(a,b){
    if(a.timestamp > b.timestamp){
      return 1
    }else if (b.timestamp > a.timestamp){
      return -1;
    }else{
      return 0
    }
  }
  
}
