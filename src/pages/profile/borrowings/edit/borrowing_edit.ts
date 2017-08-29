import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { LoadingController, NavParams, AlertController, NavController, ToastController } from 'ionic-angular';
import { RentService } from "../../../../providers/rent/rent.service"

@Component({
  selector: 'page-borrowing-edit',
  templateUrl: 'borrowing_edit.html'
})
export class BorrowingEdit {

  title: string = "Editar solicitação";
  loading: any;
  rent: any;
  key: string;

  constructor(public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public rentService: RentService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private camera: Camera,
    private imagePicker: ImagePicker) {

    this.loading = loadingCtrl.create();

    this.rent = navParams.get('rent').rent;
    this.rent['status_pretty'] = (this.rent.status === "pending" ? 
                                  "Pendente": 
                                  (this.rent.status === "aproved"? "Aprovado": "Rejeitado")
                                )
    console.log(this.rent)

  }

  public aproveRent() {
    var toast = this.toastCtrl.create({
      message: 'Salvo com sucesso!',
      duration: 3000
    });

    this.rentService.aproveRent(this.rent)
      .then(() => {
        toast.present();
      });
  }

  public rejectRent() {
    var toast = this.toastCtrl.create({
      message: 'Salvo com sucesso!',
      duration: 3000
    });

    let alert = this.alertCtrl.create({
      title: 'Motivo da rejeição',
      inputs: [
        {
          name: 'rejectReason',
          placeholder: 'Motivo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Rejeitar',
          handler: data => {
            this.rent.rejectReason = data.rejectReason
            this.rentService.rejectRent(this.rent)
              .then(() => {
                toast.present();
              });
          }
        }
      ]
    });
    alert.present();
  }

}