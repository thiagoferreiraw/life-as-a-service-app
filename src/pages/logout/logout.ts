import { Component } from '@angular/core';

import { NavController  } from 'ionic-angular';
import {UserService} from "../../providers/user/user.service"

@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class Logout {

  constructor(public navCtrl: NavController, public userService: UserService) {
    this.userService.logout();
  }


}
