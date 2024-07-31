import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule]
})
export class TableComponent implements OnInit, OnChanges {
  @Input() category: string = '';
  @Input() limit: number = 10;
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  allProducts: Product[] = [];

  constructor(private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.fetchProducts().subscribe(data => {
      this.allProducts = data;
      this.applyFilters();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] || changes['limit']) {
      this.applyFilters();
    }
  }

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  applyFilters(): void {
    let filteredData = this.allProducts;

    if (this.category) {
      filteredData = filteredData.filter(product => product.category === this.category);
    }

    this.dataSource.data = filteredData.slice(0, this.limit);
  }

  openModal(product: Product): void {
    const modalRef = this.modalService.open(ProductDetailModalComponent);
    modalRef.componentInstance.product = product;
  }
}
