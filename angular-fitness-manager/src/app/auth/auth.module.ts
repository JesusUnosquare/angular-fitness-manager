import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//third-party modules
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule  } from "@angular/fire/compat/auth";
import { getAnalytics } from "firebase/analytics";
import { AngularFireDatabaseModule  } from "@angular/fire/compat/database";
import { initializeApp } from "firebase/app";
// import { FirebaseAppConfig } from "@angular/fire/compat/firestore";
//Share Modules
import { environment } from "../../environments/environment";
import { SharedModule } from './shared/shared.module';
const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '' , pathMatch: 'full' , redirectTo : 'login' },
      { path: 'login', 
        loadChildren: () => import('./login/login.module').then(x => x.LoginModule) 
        //loadChildren: './login/login.module#LoginModule'
      },
      { path: 'register', 
        loadChildren: () => import('./register/register.module').then(x => x.RegisterModule) 
        //loadChildren: './register/register.module#RegisterModule'
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule { }
