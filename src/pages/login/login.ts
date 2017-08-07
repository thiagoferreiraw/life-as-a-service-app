import { Component } from '@angular/core';

import { NavController, MenuController, LoadingController} from 'ionic-angular';
import {SignUp} from "../signup/signup"
import {UserService} from "../../providers/user/user.service"

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  email = ""
  password = ""
  message = ""

  loading:any;

  constructor(public navCtrl: NavController, 
              public menu: MenuController, 
              public userService: UserService,
              public loadingCrtl:LoadingController) {
    this.loading = this.loadingCrtl.create();
  }

  public login(){

    this.loading.present();
    this.userService.login(this.email, this.password)
      .then(()=>{
        this.loading.dismiss()
      })
      .catch((error)=>{
        this.message = error.message;
        this.loading.dismiss()
      })

  }

  public signUp(){

    this.navCtrl.push(SignUp);

  }

}
