import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product/product.service';
import { TypeProduct } from 'src/app/shared/models/type-product.model';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate(600,  keyframes(
          [
            style({ transform: 'translateX(100%)'}),
            style({ transform: 'translateX(10%)'}),
            style({ transform: 'translateX(-10%)'}),
            style({ transform: 'translateX(5%)'}),
            style({ transform: 'translateX(-5%)'}),
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
            style({ transform: 'translateX(-10%)'}),
            style({ transform: 'translateX(100%)'}),
          ]
        ))
      ])
    ])
  ]
})
export class FormProductComponent implements OnInit {

  public isNew: boolean = true;
  public id: number;
  public types: Array<TypeProduct>;

  // FORM
  public form: FormGroup;
  
  constructor(private route: ActivatedRoute, private router:Router, private productService: ProductService) {
    this.route.params.subscribe(res => {
      if(res.id != 'new') {

      }
    });

    this.productService.typesOfProduct().subscribe( res=> {
      this.types = res;
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]+(\.?[0-9]+)?$')]),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.info(this.form.valid);
    if(this.form.valid) {
      console.log("submit");
    }
  }

  cancel($event) {
    if($event.totalTime > 0) {
      this.router.navigateByUrl('product');
    }
  }

}
