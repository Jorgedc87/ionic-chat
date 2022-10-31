import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../interfaces/user';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  nombre
  id

  urlv1='https://hostinjor.com/aledapi/v1/users/';

  constructor(public http: HttpClient, public route: Router) { }

  register(user: any){
    return this.http.post<User>(this.urlv1 + 'register', user);
  }

  login(user: any){
    return this.http.post<User>(this.urlv1 + 'login', user);
  }

  saveData(user: any){
    setTimeout(() => {
      localStorage.setItem("idALED", String(user.id))
      localStorage.setItem("nameALED", user.name)
      localStorage.setItem("emailALED", user.email)
    }, 1000);
  }

  public auth()
  {
    this.getId()
    this.getNombre()
    if(this.id){
      return this.id;
    }else{
      return false;
    }
  }

  public getId(): void{
    if(!this.id){
      this.id = Number(localStorage.getItem("idALED"));
    }
  }

  public getNombre(): void{
    if(!this.nombre){
      this.nombre = localStorage.getItem("nameALED");
    }
  }

  logout(): void{
    this.id = ''
    localStorage.removeItem("idALED")
    localStorage.removeItem("nameALED")
    localStorage.removeItem("mailALED")
    this.route.navigate([''])
  }
}
