import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product/product.service';
import { map, filter, reduce } from 'rxjs/operators';
import { Filter } from 'src/app/shared/models/find';
import { Product } from 'src/app/shared/models/product.model';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { TypeProduct } from 'src/app/shared/models/type-product.model';

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

  // PARAM FOR ACTIVE ANIMARION slideOut
  public slideOut: boolean;

  // MATERIAL TABLE 
  public displayedColumns: string[] = ['code', 'name', 'type', 'active'];
  
  // FORM FOR FILTER
  public form: FormGroup;
  
  // RESULT FOR VIEW
  public products: Array<Product>;
  
  // TYPE OF PRODUCT
  public types: Array<TypeProduct>;

  // SELECTED ID FOR UPDATE
  public selectedId: string;
   
  constructor(private productService: ProductService, private router: Router) { 
  }

  ngOnInit() {
    this.form = new FormGroup({
      numberOfLines: new FormControl(this.DEFAULT_NUMBER_OF_LINES),
      code: new FormControl(null),
      type: new FormControl(null),
      active: new FormControl(null),
    });

    this.productService.typesOfProduct().subscribe( res=> {
      this.types = res;
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

  viewProduct(id) {
    this.selectedId = id;
    this.slideOut = true;
  }

  routeForForm($event) {
    if($event.totalTime > 0) {
      if(this.selectedId) {
        console.log(this.selectedId);
        this.router.navigateByUrl('product/'+this.selectedId);
      } else {
        this.router.navigateByUrl('product/new');
      }
    }
  }
}
