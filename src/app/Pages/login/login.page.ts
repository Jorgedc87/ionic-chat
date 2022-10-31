import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public forma: FormGroup;

  passwordRepeat!: string;

  constructor(

    private fb: FormBuilder,
    public router: Router,
    public authServ: AuthService,
    private menuCtrl: MenuController
    ) { }

  ngOnInit(): void {
    this.forma = this.fb.group({ //se toma del constructor que tiene inyectado el servicio que esta importado
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(){
    let error = 0;
    let usuario: any
    this.authServ.login(this.forma.value).subscribe(resp => {
      usuario = resp
    })
    if(error==0){
      setTimeout(() => {
        this.authServ.saveData(usuario)
        this.router.navigate([''])
      }, 1000);
    }
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }

}
