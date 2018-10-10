import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryProductComponent } from './query-page/query-product.component';
import { FormProductComponent } from './form-page/form-product.component';

const routes: Routes = [
  { path: 'product', component: QueryProductComponent },
  { path: 'product/:id', component: FormProductComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ProductRoutingModule { }
