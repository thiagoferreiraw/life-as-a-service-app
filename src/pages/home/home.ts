import { Component, NgZone } from '@angular/core';

import { NavController  } from 'ionic-angular';
import {ProductService} from "../../providers/product/product.service"
import {ProductRent} from "../product_rent/product_rent"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  items: Array<{product: any, key:string}>=[];
  showSpinner:boolean = true;
  showSearchBar:boolean= false;
  myInput:string;

  public constructor(public productService: ProductService, 
                      public zone: NgZone,
                      public navCtrl: NavController,) {

    this.productService.getAllProducts().on("value", (data)=>{      
      
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

  public toggleSearchBar(){
    this.showSearchBar=!this.showSearchBar;
  }

  public itemTapped(event, item) {    
    this.navCtrl.push(ProductRent, {
      product: item.product,
      key: item.key
    });
  }

}
