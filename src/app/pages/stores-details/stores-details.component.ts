import { Component, OnInit } from '@angular/core';
import { IStores, SupplierService } from '../../services/supplier.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stores-details',
  templateUrl: './stores-details.component.html',
  styleUrl: './stores-details.component.scss',
})
export class StoresDetailsComponent implements OnInit {
  store: IStores;
  title: string = 'Stores Details';
  storeId: number | null = null;
  breadcrumbsItems = [
    { label: 'Stores', link: '/' },
    { label: 'Stores Details', link: `/store/${this.storeId}` },
  ];
  constructor(
    public supplierService: SupplierService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.storeId = +params['id'];
      this.supplierService.stores$.subscribe((stores) => {
        this.store = stores.find((store) => store.id === this.storeId)!;
      });
    });
  }
}
