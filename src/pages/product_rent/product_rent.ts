import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { LoadingController, NavParams, AlertController, NavController, ToastController } from 'ionic-angular';
import { RentService } from "../../providers/rent/rent.service"
import { DateUtils} from "../../app/utils"

@Component({
  selector: 'page-product-rent',
  templateUrl: 'product_rent.html'
})
export class ProductRent {

  title: string = "Alugar produto";
  loading: any;
  product: any;
  key: string;
  rent: any;

  constructor(public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public rentService: RentService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private camera: Camera,
    private imagePicker: ImagePicker) {

    this.loading = loadingCtrl.create();

    this.product = navParams.get('product');
    this.key = navParams.get('key');

    this.rent = {
      total_value: 0,
      days: 1,
      price_per_day: this.product.price,
      date_start: new Date().toISOString(),
      date_end: new Date().toISOString()
    }

    this.calc_total_value();
  }

  public calc_total_value() {
    this.rent.date_end = DateUtils.addDays(this.rent.date_start, this.rent.days);
    this.rent.total_value = this.rent.days * parseFloat(this.rent.price_per_day);
  }

  public saveData() {
    var toast = this.toastCtrl.create({
      message: 'Aluguel solicitado com sucesso! Aguarde aprovação!',
      duration: 3000
    });

    this.rentService.saveProductRent(this.product, this.rent)
      .then(() => {
        toast.present();
      });

  }

}