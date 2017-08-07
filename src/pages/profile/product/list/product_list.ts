import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProductEdit} from '../edit/product_edit';
import {ProductService} from "../../../../providers/product/product.service"

@Component({
  selector: 'page-product-list',
  templateUrl: 'product_list.html'
})
export class ProductList {
  selectedItem: any;
  icons: string[];
  items: Array<{product: any, key:string}>=[];
  test:any;
  showSpinner:boolean = true;

  public constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductService,private zone:NgZone) {    

    this.productService.getUserProducts()
      .on('value', (data)=> {        
        data = data.val();
        this.items = [];          
        for (var key in data){          
          this.items.push(
            {product: data[key], key: key}
          );
        }
        this.showSpinner = false;
        this.zone.run(()=>{}); //atualiza a tela
    });

  }

  public itemTapped(event, item) {    
    this.navCtrl.push(ProductEdit, {
      product: item.product,
      key: item.key
    });
  }

  public newProduct(){
    this.navCtrl.push(ProductEdit);
  }
}
