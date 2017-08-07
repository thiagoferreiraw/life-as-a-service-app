import {Injectable} from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class UserService {
  public auth: any;
  constructor() {
    this.auth = firebase.auth();
  }

  public login(userEmail: string, userPassword: string) {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(userEmail, userPassword)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  public signUp(email: string, password:string, name:string, phone:string){
    return new Promise((resolve, reject) =>{
      firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((user) => {

          var post_user = {
            uid: user.uid,
            email: user.email,
            name: name,
            phone: phone
          }

          firebase.database().ref("/users").child(user.uid).child("profile").set(post_user)

          resolve(user);

        }).catch((error) => reject(error));


    });

  }

  public saveProfile(name:string, phone:string){
    var currentUser = this.getCurrentUser();

    var updates = {};

    updates['/users/' + currentUser.uid+"/profile"] = {
      name: name,
      phone: phone,
      email : currentUser.email,
      uid: currentUser.uid
    };

    return firebase.database().ref().update(updates)
  }

  public getCurrentUser(){
    return firebase.auth().currentUser;
  }

  public getCurrentUserProfile(){
    return firebase.database().ref('/users/' + this.getCurrentUser().uid+"/profile").once("value")
  }

  public logout() {
    return this.auth.signOut();
  }

}
