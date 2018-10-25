import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FirebaseConfig } from 'src/environments/firebase.config';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports:[
    HeaderComponent
  ]
})
export class CoreModule { }
