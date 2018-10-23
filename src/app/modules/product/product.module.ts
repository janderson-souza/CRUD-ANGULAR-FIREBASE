import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { QueryProductComponent } from './query-page/query-product.component';
import { FormProductComponent } from './form-page/form-product.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  declarations: [QueryProductComponent, FormProductComponent]
})
export class ProductModule { }
