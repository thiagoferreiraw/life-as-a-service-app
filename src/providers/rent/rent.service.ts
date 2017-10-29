import { Injectable } from '@angular/core';

import firebase from 'firebase';
import 'dateformat';

@Injectable()
export class RentService {
  constructor() {

  }

  public saveProductRent(product, rent) {
    var key = firebase.database()
      .ref()
      .child("/rents/")
      .push()
      .key;

    return firebase.database().ref("/users/"+product.user_id+"/profile")
      .once('value')
      .then((snapshot)=>{
        console.log(snapshot)
        var user_email_owner = snapshot.val().email
        var user_phone_owner = snapshot.val().phone
        var update = {};
        var currentUser = firebase.auth().currentUser
        rent.user_id_requester = currentUser.uid;
        rent.user_id_owner = product.user_id;
        rent.product = product;
        rent.rent_id = key;
        rent.status = "pending"        
        //rent.date_start = dateformat(rent.date_start, "dd/mm/yyyy")
        //rent.date_end = rent.date_end.toString().substr(0,10)
        rent['user_email_requester'] = currentUser.email
        rent['user_phone_owner'] = user_phone_owner
        rent['user_email_owner'] = user_email_owner 
        update['/users/' + rent.user_id_requester + "/borrowings/" + key] = rent;
        update['/users/' + rent.user_id_owner + "/lendings/" + key] = rent;  
        //update['/products/' + product.product_id + "/rents_pending/" + key] = rent;
        firebase.database().ref().update(update);    
      });

    
  }

  public aproveRent(rent){
    var update = {}
    rent.status = "aproved"    
    update['/users/' + rent.user_id_requester + "/borrowings/" + rent.rent_id] = rent;
    update['/users/' + rent.user_id_owner + "/lendings/" + rent.rent_id] = rent;  
    return firebase.database().ref().update(update);
  }

  public rejectRent(rent){
    var update = {}
    rent.status = "rejected"    
    update['/users/' + rent.user_id_requester + "/borrowings/" + rent.rent_id] = rent;
    update['/users/' + rent.user_id_owner + "/lendings/" + rent.rent_id] = rent;  
    return firebase.database().ref().update(update);
  }  

  public getUserLendings() {
    return firebase.database()
      .ref('/users/' + firebase.auth().currentUser.uid + "/lendings/");
  }


  public getUserBorrowings() {
    return firebase.database()
      .ref('/users/' + firebase.auth().currentUser.uid + "/borrowings/");
  }

}
