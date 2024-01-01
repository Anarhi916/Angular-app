import { Component, OnInit } from '@angular/core';
import { IStores, SupplierService } from '../../services/supplier.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { CreateStoreDialogComponent } from '../create-store-dialog/create-store-dialog.component';

@Component({
  selector: 'app-stores-table',
  templateUrl: './stores-table.component.html',
  styleUrl: './stores-table.component.scss',
})
export class StoresTableComponent implements OnInit {
  dataSource: MatTableDataSource<IStores>;
  constructor(
    public supplierService: SupplierService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.supplierService.getAllStores().subscribe(() => {
      this.dataSource = new MatTableDataSource<IStores>(
        this.supplierService.stores
      );
    });
  }
  displayedColumns: string[] = ['select', 'name', 'address', 'id'];

  selection = new SelectionModel<IStores>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navToStoreDetails(row: IStores) {
    this.router.navigate(['/supplier', row.id]);
  }

  deleteRowsPress() {
    const selectedRows: IStores[] = this.selection.selected;
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.supplierService.deleteStores(selectedRows).subscribe({
          next: () => {
            this.selection.clear();
            this.supplierService.stores = this.supplierService.stores.filter(
              (store) => !selectedRows.find((row) => row.id === store.id)
            );
            this.dataSource = new MatTableDataSource<IStores>(
              this.supplierService.stores
            );
          },
          error: (error) => {
            console.error('Error while deleting', error);
          },
        });
      }
    });
  }

  createStorePress() {
    const dialogRef = this.dialog.open(CreateStoreDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.Established = new Date();
        this.supplierService.create(result).subscribe({
          next: () => {
            this.dataSource = new MatTableDataSource<IStores>(
              this.supplierService.stores
            );
          },
          error: (error) => {
            console.error('Error while creating', error);
          },
        });
      }
    });
  }
}
