import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/product';
 
  productRef: AngularFireList<Product> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.productRef = db.list(this.dbPath);
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
 
  getProductList(): AngularFireList<Product> {
    return this.productRef;
  }
 
  deleteAll(): void {
    this.productRef.remove().catch(error => this.handleError(error));
  }
 
  private handleError(error) {
    console.log(error);
  }
}
