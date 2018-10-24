import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-query-product',
  templateUrl: './query-product.component.html',
  styleUrls: ['./query-product.component.scss']
})
export class QueryProductComponent implements OnInit {

  public form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl(null),
      name: new FormControl(null),
      description: new FormControl(null),
    });
  }

  onSubmit() {
    console.warn(this.form.value);
  }

}
