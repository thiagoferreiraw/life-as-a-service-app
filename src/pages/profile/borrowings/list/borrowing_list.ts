import { Component,NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BorrowingEdit } from '../edit/borrowing_edit';
import { RentService} from "../../../../providers/rent/rent.service"

@Component({
  selector: 'page-borrowing-list',
  templateUrl: 'borrowing_list.html'
})
export class BorrowingList {
  selectedItem: any;
  icons: string[];
  items: Array<{rent: any, key:string}>=[];
  test:any;
  showSpinner:boolean = true;

  public constructor(public navCtrl: NavController, public navParams: NavParams, public rentService: RentService,private zone:NgZone) {    

    this.rentService.getUserBorrowings()
      .on('value', (data)=> {        
        data = data.val();
        this.items = [];                         

        for (var key in data){          
          this.items.push(
            {rent: data[key], key: key}
          );
        }

        
        console.log(this.items)
        this.showSpinner = false;
        this.zone.run(()=>{}); //atualiza a tela
    });

  }

  public itemTapped(event, item) {    
    this.navCtrl.push(BorrowingEdit, {
      rent: item      
    });
  }  
}