
# Life as a service APP

[Tcc Life As Service.pdf](https://github.com/thiagoferreiraw/life-as-a-service-app/files/6648438/Tcc.Life.As.Service.pdf)

## Features
  - Request services and products provided by other users over the app.
  
## Tecnologies
 - Ionic 2 
 - Angular 2
 - HTML5
 - Firebase
 - Android Platform
## Requirements
- Sign up to a free [Google firebase account](https://firebase.google.com/) and create an app.

## Build instructions
- First, create the file src/config/firebase.config.ts as follow:
```
export const FIREBASE_CONFIG = {
      apiKey: "XXXXXXXXXXXXx",
      authDomain: "XXXXXXXXXXXXx",
      databaseURL: "XXXXXXXXXXXXx",
      storageBucket: "XXXXXXXXXXXXx",
      messagingSenderId: "XXXXXXXXXXXXx"
};
```
- Install dependencies 
```
npm install
```
- Run
```
npm start
```
