import { Injectable } from '@angular/core';

import firebase from 'firebase';

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

    var update = {};
    rent.user_id_requester = firebase.auth().currentUser.uid;
    rent.user_id_owner = product.user_id;
    rent.product = product;
    rent.rent_id = key;
    rent.status = "pending"
    update['/users/' + rent.user_id_requester + "/rent_request/" + key] = rent;
    update['/users/' + rent.user_id_owner + "/rent_provided/" + key] = rent;  
    //update['/products/' + product.product_id + "/rents_pending/" + key] = rent;
    return firebase.database().ref().update(update);

  }

  public aproveRent(rent){
    var update = {}
    rent.status = "aproved"    
    update['/users/' + rent.user_id_requester + "/rent_request/" + rent.rent_id] = rent;
    update['/users/' + rent.user_id_owner + "/rent_provided/" + rent.rent_id] = rent;  
    return firebase.database().ref().update(update);
  }

  public rejectRent(rent){
    var update = {}
    rent.status = "rejected"    
    update['/users/' + rent.user_id_requester + "/rent_request/" + rent.rent_id] = rent;
    update['/users/' + rent.user_id_owner + "/rent_provided/" + rent.rent_id] = rent;  
    return firebase.database().ref().update(update);
  }  

  public getUserRents() {
    return firebase.database()
      .ref('/users/' + firebase.auth().currentUser.uid + "/rent_provided/");
  }



}
