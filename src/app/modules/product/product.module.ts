import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { QueryProductComponent } from './query-page/query-product.component';
import { FormProductComponent } from './form-page/form-product.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
  ],
  declarations: [QueryProductComponent, FormProductComponent]
})
export class ProductModule { }
