import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { MatIconModule } from '@angular/material';
import { CardComponent } from './components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [ TitleComponent, CardComponent ],
  exports: [ TitleComponent, CardComponent ]
})
export class SharedModule { }
