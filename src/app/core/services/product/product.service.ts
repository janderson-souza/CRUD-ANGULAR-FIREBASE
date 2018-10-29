import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Product } from 'src/app/shared/models/product.model';
import { Observable } from 'rxjs';
import { QueryFn } from '@angular/fire/firestore';
import { TypeProduct } from 'src/app/shared/models/type-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';


  constructor(private db: AngularFirestore) {
  }

  find(numberOfResults:number, product: Product = null): Observable<Product[]> {
    return this.db.collection<Product>(this.dbPath, ref => this.createQuery(ref, numberOfResults, product)).valueChanges();
  }

  createQuery(ref: CollectionReference, numberOfResults:number, product: Product): any {
    let query: firebase.firestore.Query = ref.limit(Number(numberOfResults));
    if(product) {
      if(product.code)        {query = ref.where('code', '==', product.code)}
      if(product.name)        {query = ref.where('name', '==', product.name)}
      if(product.description) {query = ref.where('description', '==', product.description)}
    } 
    return query;
  }

  typesOfProduct(): Observable<TypeProduct[]>{
    return this.db.collection<TypeProduct>('/types-of-product').valueChanges();
  }
}
