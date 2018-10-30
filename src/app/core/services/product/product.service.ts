import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentReference, DocumentChangeAction } from '@angular/fire/firestore';
import { Product } from 'src/app/shared/models/product.model';
import { Observable } from 'rxjs';
import { TypeProduct } from 'src/app/shared/models/type-product.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';

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
      if(product.file) {
        let pathRefImage = this.storagePath + product.code + '_' + product.name + '_' + product.file.name;
        const fileRef = this.storage.ref(pathRefImage);
        this.storage.upload(pathRefImage, product.file).snapshotChanges().toPromise().then(res => {
          fileRef.getDownloadURL().subscribe(urlFile => {
            product.file = null;
            product.urlFile = urlFile;
            resolve(this.db.collection<Product>(this.dbPath).add(product));
          });
        });
      } else {
        resolve(this.db.collection<Product>(this.dbPath).add(product));
      }
    });
  }

  update(id, product: Product): Promise<any> {
    return this.db.doc(this.dbPath + "/" + id).update(product);
  }

  find(numberOfResults:number, product: Product = null): Observable<Product[]> {
    return new Observable((observer) => {
      this.db.collection<Product>(this.dbPath, ref => this.createQuery(ref, numberOfResults, product)).snapshotChanges().pipe(
        map((actions: DocumentChangeAction<Product>[]) => {
          return actions.map((a: DocumentChangeAction<Product>) => {
            let data: Product = a.payload.doc.data() as Product;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      ).subscribe(res => {
        observer.next(res);
      });
    });
  }

  findById(id): Observable<Product> {
    return new Observable((observer) => {
      this.db.doc<Product>(this.dbPath + "/" + id).get().subscribe(res =>{
        observer.next(res.data() as Product);
      });
    })
  }

  createQuery(ref: CollectionReference, numberOfResults:number, product: Product): any {
    let query: firebase.firestore.Query = ref.limit(Number(numberOfResults));
    if(product) {
      if(product.code)        {query = query.where('code', '==', product.code)}
      if(product.type)        {query = query.where('type', '==', product.type)}
      if(product.active)      {query = query.where('active', '==', product.active)}
    }
    return query;
  }

  typesOfProduct(): Observable<TypeProduct[]>{
    return this.db.collection<TypeProduct>('/types-of-product').valueChanges();
  }

}
