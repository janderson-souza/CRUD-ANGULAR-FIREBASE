import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FirebaseConfig } from 'src/environments/firebase.config';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports:[
    HeaderComponent
  ]
})
export class CoreModule { }
