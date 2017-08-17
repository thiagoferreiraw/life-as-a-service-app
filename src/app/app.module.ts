import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page2 } from '../pages/page2/page2';
import { Login } from '../pages/login/login';
import { Loading } from '../pages/loading/loading';
import { Profile } from '../pages/profile/profile';
import { ProductList } from '../pages/profile/product/list/product_list';
import { ProductEdit } from '../pages/profile/product/edit/product_edit';
import { RentList } from '../pages/profile/rent/list/rent_list';
import { RentEdit } from '../pages/profile/rent/edit/rent_edit';
import { ProductRent } from '../pages/product_rent/product_rent';
import { Home } from '../pages/home/home';
import { SignUp } from '../pages/signup/signup';
import { Logout } from '../pages/logout/logout';
//import { DataService } from '../providers/data/data.service';
import { UserService } from '../providers/user/user.service';
import { ProductService } from '../providers/product/product.service';
import { RentService } from '../providers/rent/rent.service';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';


@NgModule({
  declarations: [
    MyApp,
    Page2,
    Login,
    Profile,
    Logout,
    Home,
    ProductList,
    ProductEdit,
    ProductRent,
    RentEdit,
    RentList,
    Loading,
    SignUp
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page2,
    Login,
    Profile,
    Logout,
    Home,
    ProductList,
    ProductEdit,
    ProductRent,
    RentEdit,
    RentList,
    Loading,
    SignUp
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    ProductService,
    RentService,
    Camera,
    ImagePicker
  ]
})
export class AppModule {}
