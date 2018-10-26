import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product/product.service';
import { map, filter } from 'rxjs/operators';
import { Filter } from 'src/app/shared/models/find';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-query-product',
  templateUrl: './query-product.component.html',
  styleUrls: ['./query-product.component.scss']
})
export class QueryProductComponent implements OnInit {
  // MATERIAL TABLE 
  public displayedColumns: string[] = ['code', 'name', 'description'];
  
  // FORM FOR FILTER
  public form: FormGroup;
  
  // RESULT FOR VIEW
  public products: Array<Product>;

  // TABLE ROWS MAXIMUN
  public numberOfLines = 5;
  
  constructor(private productService: ProductService) { 
  }

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
    });
  }

  onSubmit() {
    let filter = new Filter<Product>(this.numberOfLines, this.form.value);
    this.productService.filterBy(filter).subscribe(res => {
      this.products = res.reverse();
    });
  }

  addLines() {
    this.numberOfLines = this.numberOfLines + 5;
    this.onSubmit();
  }
}
