import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryProductComponent } from './query-product.component';

describe('QueryProductComponent', () => {
  let component: QueryProductComponent;
  let fixture: ComponentFixture<QueryProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
