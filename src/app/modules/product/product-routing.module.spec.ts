import { ProductRoutingModule } from './product-routing.module';

describe('ProductRoutingModule', () => {
  let productRoutingModule: ProductRoutingModule;

  beforeEach(() => {
    productRoutingModule = new ProductRoutingModule();
  });

  it('should create an instance', () => {
    expect(productRoutingModule).toBeTruthy();
  });
});
