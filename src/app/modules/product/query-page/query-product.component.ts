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
      code: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
    });
  }

  onSubmit() {
    console.warn(this.form.value);
  }

}
