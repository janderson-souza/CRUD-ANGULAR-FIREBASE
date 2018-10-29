import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { Product } from 'src/app/shared/models/product.model';
import { Observable } from 'rxjs';
import { QueryFn } from '@angular/fire/firestore';
import { TypeProduct } from 'src/app/shared/models/type-product.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/products';
  private storagePath = '/products/';


  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
  }

  save(product: Product): Promise<any> {
    return new Promise(resolve => {
      const fileRef = this.storage.ref(this.storagePath);
      const task = this.storage.upload(this.storagePath + product.file.name, product.file);
      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe(res => {
          product.file = null;
          product.urlFile = res;
          resolve(this.db.collection<Product>(this.dbPath).add(product));
        }))
     ).subscribe()
    });
    
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
