import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserI } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public forma: FormGroup;

  passwordRepeat!: string;

  constructor(

    private fb: FormBuilder,
    public router: Router,
    public alertController: AlertController,
    public authService: AuthService,
    private menuCtrl: MenuController
    ) { }

  ngOnInit(): void {
    this.forma = this.fb.group({ //se toma del constructor que tiene inyectado el servicio que esta importado
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password-repeat': ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register(){

    if(this.forma.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que completar todos los campos',
        buttons: ['Ok']
      });
  
      await alert.present();
      return;
    }

    this.authService.register(this.forma.value).subscribe();

    this.router.navigate(['/login'])
  }

  toggleMenu(){
    this.menuCtrl.toggle();
  }
}
