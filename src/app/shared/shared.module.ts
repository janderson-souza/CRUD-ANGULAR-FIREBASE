import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ TitleComponent ],
  exports: [ TitleComponent ]
})
export class SharedModule { }
