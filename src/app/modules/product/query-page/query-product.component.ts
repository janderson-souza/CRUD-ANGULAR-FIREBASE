import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-query-product',
  templateUrl: './query-product.component.html',
  styleUrls: ['./query-product.component.scss']
})
export class QueryProductComponent implements OnInit {

  public form: FormGroup;
  public products: any;
  public displayedColumns: string[] = ['code', 'name', 'description'];
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
    });
  }

  onSubmit() {
    this.productService.getProductList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(products => {
      this.products = products;
      console.log(products);
    });
  }

}
