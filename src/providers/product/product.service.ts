import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class ProductService {
  constructor() {

  }

  public getUserProducts() {
    return firebase.database()
      .ref('/users/' + this.getCurrentUser().uid + "/products/");
  }

  public getAllProducts() {
    return firebase.database().ref('/products/');
  }

  public saveProduct(key, product) {
    return new Promise((resolve, reject) => {
      if (key == null) {
        key = firebase.database()
          .ref()
          .child("/users/" + this.getCurrentUser().uid + "/products")
          .push()
          .key;
      }
      this.updateProduct(key, product)
        .then((data) => resolve(data));
    });
  }

  public updateProduct(key, product) {
    var update = {};
    product.user_id = firebase.auth().currentUser.uid;
    product.product_id = key
    update['/users/' + firebase.auth().currentUser.uid + "/products/" + key] = product;
    update['/products/' + key] = product;
    return firebase.database().ref().update(update);
  }

  public deleteProduct(key) {
    var update = {};
    update['/users/' + firebase.auth().currentUser.uid + "/products/" + key] = null;
    update['/products/' + key] = null;

    return firebase.database().ref().update(update);
  }

  public getCurrentUser() {
    return firebase.auth().currentUser;
  }

  public getCurrentUserProfile() {
    return firebase.database()
      .ref('/users/' + this.getCurrentUser().uid + "/profile")
      .once("value")
  }

 
}
