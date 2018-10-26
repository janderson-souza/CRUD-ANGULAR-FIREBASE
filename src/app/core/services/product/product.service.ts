import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/shared/models/product.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Filter } from 'src/app/shared/models/find';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';


  constructor(private db: AngularFirestore) {
    this.db.collection(this.dbPath, ref => ref.where('code', '==', 'Casa')).valueChanges().subscribe(res => {
      console.log(res);
    })
  }

}
