import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { LoadingController, NavParams, AlertController, NavController,ToastController  } from 'ionic-angular';
import {ProductService} from "../../../../providers/product/product.service"



@Component({
  selector: 'page-product-edit',
  templateUrl: 'product_edit.html'
})
export class ProductEdit {

  title:string="Editar produto";
  loading:any;
  product:any;
  key:string;

  constructor(public loadingCtrl: LoadingController,
              public navParams: NavParams,
              public productService: ProductService,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              private camera: Camera,
              private imagePicker: ImagePicker) {

    this.loading = loadingCtrl.create();

    this.product = navParams.get('product');
    this.key = navParams.get('key');

    if (!this.product){
      this.product = {
        name: null,
        description:null,
        price: null,
        user_id: null
      }
      this.title="Novo produto";
    }

  }

  public saveData(){
    var toast = this.toastCtrl.create({
                  message: 'Produto salvo com sucesso!',
                  duration: 3000
                });

    this.productService.saveProduct(this.key, this.product)
      .then(()=>{
        toast.present();
      });
    
  }

  public deleteProduct(){
    let confirm = this.alertCtrl.create({
      title: 'Deseja realmente excluir?',      
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.productService.deleteProduct(this.key);
            this.navCtrl.pop();
            this.toastCtrl.create({
                  message: 'Produto excluído com sucesso!',
                  duration: 3000
                }).present();
          }
        }
      ]
    });
    confirm.present();
    
  }

/*  public takePicture(){
    this.camera.getPicture({
      quality : 50,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 281,
      saveToPhotoAlbum: true
    }).then(imageData => {      
      //this.product.picture = imageData;
      //console.log(imageData);
      this.product.picture = 'data:image/jpeg;base64,'+imageData;
      //document.getElementById('product-picture').src = 'data:image/jpeg;base64,'+imageData;            
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
      this.toastCtrl.create({
                  message: JSON.stringify(error),
                  duration: 5000
                }).present();
    });    
  }

  public getImage(){
    this.imagePicker.getPictures({
      maximumImagesCount:1      
    }).then((results) => {      
      console.log('Image URI: ' + results[0]);          
      this.product.picture = results[0];
    }).catch((error)=>{
      console.log("Error: "+error)
    });    
  }
*/


}