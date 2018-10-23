import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { QueryProductComponent } from './query-page/query-product.component';
import { FormProductComponent } from './form-page/form-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: [QueryProductComponent, FormProductComponent]
})
export class ProductModule { }
