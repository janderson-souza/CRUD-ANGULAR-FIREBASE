import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/core/services/product/product.service';
import { TypeProduct } from 'src/app/shared/models/type-product.model';
import { MatSnackBar } from '@angular/material';

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

  public slideOut: boolean = false;
  public isNew: boolean = true;
  public id: number;
  public types: Array<TypeProduct>;

  // FORM
  public form: FormGroup;
  
  constructor(private route: ActivatedRoute , 
              private router:Router,
              private productService: ProductService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl(null, [Validators.required, Validators.maxLength(5), Validators.pattern('^[0-9]+(\.?[0-9]+)?$')]),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      active: new FormControl(false, Validators.required),
      file: new FormControl(null),
    });

    this.route.params.subscribe(res => {
      if(res.id != 'new') {

      }
    });

    this.productService.typesOfProduct().subscribe( res=> {
      this.types = res;
    });
  }

  onSubmit() {
    console.log(this.form.value);
    if(this.form.valid) {
      this.productService.save(this.form.value).then( res => {
        this.slideOut = true;
        this.snackBar.open('Product saved successfully', null, {duration: 2000});
      });
    } 
  }

  returnToQueryPage($event) {
    if($event.totalTime > 0) {
      this.router.navigateByUrl('product');
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.form.get('file').setValue(event.target.files[0]);
    }
  }

}
