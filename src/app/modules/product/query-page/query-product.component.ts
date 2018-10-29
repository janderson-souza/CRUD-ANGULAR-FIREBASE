import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product/product.service';
import { map, filter, reduce } from 'rxjs/operators';
import { Filter } from 'src/app/shared/models/find';
import { Product } from 'src/app/shared/models/product.model';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-query-product',
  templateUrl: './query-product.component.html',
  styleUrls: ['./query-product.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate(600,  keyframes(
          [
           style({ transform: 'translateX(-100%)'}),
           style({ transform: 'translateX(10%)'}),
           style({ transform: 'translateX(-5%)'}),
           style({ transform: 'translateX(5%)'}),
           style({ transform: 'translateX(0%)'}),
          ]
        ))
      ])
    ]),
    trigger('slideOut', [
      transition(':leave', [
        animate(300,  keyframes(
          [
           style({ transform: 'translateX(0%)'}),
           style({ transform: 'translateX(10%)'}),
           style({ transform: 'translateX(-15%)'}),
           style({ transform: 'translateX(-100%)'}),
          ]
        ))
      ])
    ])
  ]
})
export class QueryProductComponent implements OnInit {
  private DEFAULT_NUMBER_OF_LINES = 5;

  // MATERIAL TABLE 
  public displayedColumns: string[] = ['code', 'name', 'description'];
  
  // FORM FOR FILTER
  public form: FormGroup;
  
  // RESULT FOR VIEW
  public products: Array<Product>;

  constructor(private productService: ProductService, private router: Router) { 
  }

  ngOnInit() {
    this.form = new FormGroup({
      numberOfLines: new FormControl(this.DEFAULT_NUMBER_OF_LINES),
      code: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
    });
    this.find();
  }

  onSubmit() {
    this.find();
  }

  find(){
    this.productService.find(this.getMaxNumberOfLines(), this.form.value).subscribe(res => {
      this.products = res;
    });
  }

  showMore() {
    this.form.get('numberOfLines').setValue(this.getMaxNumberOfLines() + this.DEFAULT_NUMBER_OF_LINES);
    this.find();
  }

  getMaxNumberOfLines(): number {
    if(this.form) {
      if(Number(this.form.get('numberOfLines').value) == 0) {
        this.form.get('numberOfLines').setValue(this.DEFAULT_NUMBER_OF_LINES);
      } 
      return this.form.get('numberOfLines').value;
    } else {
      return this.DEFAULT_NUMBER_OF_LINES;
    }
  }

  viewProduct(row) {
    console.log(row);
  }

  newProduct($event) {
    if($event.totalTime > 0) {
      this.router.navigateByUrl('product/new');
    }
  }
}
