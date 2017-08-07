import { Component } from '@angular/core';

import {LoadingController  } from 'ionic-angular';
import {UserService} from "../../providers/user/user.service"

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {

  uid = "";
  name = "";
  phone = "";
  message = "";

  loading;

  constructor(public loadingCtrl: LoadingController,public userService: UserService) {

    this.loading = loadingCtrl.create();
    this.loading.present();

    this.uid = this.userService.getCurrentUser().uid;

    this.userService.getCurrentUserProfile()
      .then((response) => {
          this.name = response.val().name;
          this.phone = response.val().phone;
          this.loading.dismiss();
      });


  }

  public saveData() {

    this.userService.saveProfile(this.name, this.phone)
      .then(() => {
        this.message = "Salvo!";
      }
    ).catch((error)=> {
      console.log(error);
      this.message = "Erro ao salvar" ;
      }
    );
  }

}
