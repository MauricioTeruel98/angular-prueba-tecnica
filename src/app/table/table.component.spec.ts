import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule, TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products from API', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', category: "men's clothing", price: 100, description: 'A nice product' },
      { id: 2, title: 'Product 2', category: 'jewelery', price: 200, description: 'Another nice product' },
    ];

    component.fetchProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should filter products based on category and limit', () => {
    component.allProducts = [
      { id: 1, title: 'Product 1', category: "men's clothing", price: 100, description: 'A nice product' },
      { id: 2, title: 'Product 2', category: 'jewelery', price: 200, description: 'Another nice product' },
      { id: 3, title: 'Product 3', category: "women's clothing", price: 300, description: 'Yet another nice product' },
    ];
    component.category = "men's clothing";
    component.limit = 1;

    component.applyFilters();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].title).toBe('Product 1');
  });

  afterEach(() => {
    httpMock.verify();
  });
});
