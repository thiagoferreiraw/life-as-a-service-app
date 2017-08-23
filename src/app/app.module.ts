import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Loading } from '../pages/loading/loading';
import { Profile } from '../pages/profile/profile';
import { ProductList } from '../pages/profile/product/list/product_list';
import { ProductEdit } from '../pages/profile/product/edit/product_edit';
import { LendingList} from '../pages/profile/lendings/list/lending_list';
import { LendingEdit } from '../pages/profile/lendings/edit/lending_edit';
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
    Login,
    Profile,
    Logout,
    Home,
    ProductList,
    ProductEdit,
    ProductRent,
    LendingEdit,
    LendingList,
    Loading,
    SignUp
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Profile,
    Logout,
    Home,
    ProductList,
    ProductEdit,
    ProductRent,
    LendingEdit,
    LendingList,
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
