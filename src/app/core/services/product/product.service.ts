import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { Product } from 'src/app/shared/models/product.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Filter } from 'src/app/shared/models/find';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/product';

  private productRef: AngularFireList<Product> = null;

  private filter = new BehaviorSubject(null);
 
  public products: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;

  constructor(private db: AngularFireDatabase) {
  }

  private createQueryRef(ref: firebase.database.Reference, filter: Filter<Product>): any {
    if(filter) {
      let query = ref.limitToLast(filter.numberOfResult);
      if(filter.obj) {
        if(filter.obj.name) {
          query = query.orderByChild('name').startAt(filter.obj.name);
        }
      } 
      return query;
    } else {
      return ref;
    }
  }
 
  createCustomer(product: Product): void {
    this.productRef.push(product);
  }
 
  updateCustomer(key: string, value: any): void {
    this.productRef.update(key, value).catch(error => this.handleError(error));
  }
 
  deleteCustomer(key: string): void {
    this.productRef.remove(key).catch(error => this.handleError(error));
  }
 
  filterBy(filter: Filter<Product>): Observable<Product[]> {
    return this.db.list<Product>(
      this.dbPath, 
      ref => this.createQueryRef(ref, filter)
    ).valueChanges()
  }
 
  deleteAll(): void {
    this.productRef.remove().catch(error => this.handleError(error));
  }
 
  private handleError(error) {
    console.log(error);
  }
}
