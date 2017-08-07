import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController,LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen  } from 'ionic-native';
import { Page2 } from '../pages/page2/page2';
import { Loading } from '../pages/loading/loading';
import { Profile } from '../pages/profile/profile';
import { ProductList } from '../pages/profile/product/list/product_list';
import { Home } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Logout } from '../pages/logout/logout';
import { FIREBASE_CONFIG } from '../config/firebase.config'

import firebase from 'firebase'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Loading;

  loading:any;

  pages: Array<{ title: string, component: any }> = [
      { title: 'Início', component: Home },
      { title: 'Meus Produtos', component: ProductList },
      { title: 'Perfil', component: Profile },
      { title: 'Page Two', component: Page2 },
      { title: 'Logout', component: Logout }
    ];

  constructor(public platform: Platform, public menu: MenuController,public loadingCtrl: LoadingController) {

    this.loading = this.loadingCtrl.create();    
    this.loading.present();
    this.initializeFirebase();
    this.initializeApp();
    
  }

  public initializeApp() {

    this.platform.ready().then(() => {
      Splashscreen.hide();      
      StatusBar.backgroundColorByHexString("1A237E");      
      this.firebaseOnAuthChange();
    });

  }

  public openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public initializeFirebase(){
    firebase.initializeApp(FIREBASE_CONFIG);    
  }

  public firebaseOnAuthChange(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        this.menu.swipeEnable(true);
        this.nav.setRoot(Home);

      } else {

        this.menu.swipeEnable(false);
        this.nav.setRoot(Login);

      }

      this.loading.dismiss();

    });
  }

}


