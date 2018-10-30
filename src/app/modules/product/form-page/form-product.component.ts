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
      urlFile: new FormControl(null)
    });

    this.route.params.subscribe(res => {
      if(res.id != 'new') {
        this.id = res.id;
        this.productService.findById(this.id).subscribe(res => {
          this.form.setValue(res);
        });
      }
    });

    this.productService.typesOfProduct().subscribe( res=> {
      this.types = res;
    });
  }

  onSubmit() {
    if(this.form.valid) {
      if (this.form.get('urlFile').value) {
        this.form.disable();
        if(!this.id) {
          this.productService.save(this.form.value).then( () => {
            this.slideOut = true;
            this.snackBar.open('Product saved successfully', null, {duration: 3000});
          });
        } else {
          this.productService.update(this.id, this.form.value).then(() => {
            this.slideOut = true;
            this.snackBar.open('Product updated successfully', null, {duration: 3000});
          });
        }
      } else {
        this.snackBar.open('Image is required', null, {duration: 2000, panelClass: 'accent'});
      }
    } 
  }

  returnToQueryPage($event) {
    if($event.totalTime > 0) {
      this.router.navigateByUrl('product');
    }
  }

  removeImage() {
    this.form.get('file').setValue(null);
    this.form.get('urlFile').setValue(null);
  }

  onFileChange(event, input:any) {
    let reader = new FileReader();
    if(this.fileIsValid(event.target.files)) {
      this.form.get('file').setValue(event.target.files[0]);
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.form.get('urlFile').setValue(reader.result);
        input.value = "";
      };
    } else {
      input.value = "";
      this.snackBar.open('Invalid file', null, {duration: 2000, panelClass: 'accent'});
    }
  }

  fileIsValid(files: File[]): boolean {
    return files 
        && files.length == 1
        && (files[0].type == 'image/png' || files[0].type == 'image/jpg' || files[0].type == 'image/jpeg' || files[0].type == 'image/gif');
  }

  getErrorMessage(fc: FormControl): string {
    return fc.hasError('required') ? 'You must enter a value' :
           fc.hasError('pattern') ? 'This field only receives numbers' :
           '';
  }

}
