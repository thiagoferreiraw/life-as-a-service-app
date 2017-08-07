import { Component } from '@angular/core';

import { NavController, MenuController, LoadingController } from 'ionic-angular';
import {UserService} from "../../providers/user/user.service"


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUp {

  name = "";
  phone = "";
  email = "";
  password = "";

  message = "";

  loading:any;
  constructor(public navCtrl: NavController, public menu: MenuController, public userService: UserService,
              public loadingCtrl:LoadingController) {
    this.loading = this.loadingCtrl.create();
              
  }

  public signUp(){

    if (this.name == "" ||
        this.phone == "" ||
        this.email == "" ||
        this.password == ""
      ){
      this.message = "Preencha todos os campos!";
      return;
    }

    this.loading.present();
    this.userService.signUp(this.email, this.password, this.name, this.phone)   
      .then(()=>this.loading.dismiss())   
      .catch(error => {
        this.loading.dismiss()
        this.message = error.message;
      })  ;
    
  }

}
