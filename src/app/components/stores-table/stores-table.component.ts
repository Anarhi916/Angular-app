import { Component, OnDestroy, OnInit } from '@angular/core';
import { IStores, SupplierService } from '../../services/supplier.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { CreateStoreDialogComponent } from '../create-store-dialog/create-store-dialog.component';
import { MessagePopupComponent } from '../message-popup/message-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stores-table',
  templateUrl: './stores-table.component.html',
  styleUrl: './stores-table.component.scss',
})
export class StoresTableComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<IStores>;
  private storesSubscription: Subscription;
  displayedColumns: string[] = ['select', 'name', 'address', 'id'];
  selection = new SelectionModel<IStores>(true, []);

  constructor(
    public supplierService: SupplierService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.storesSubscription = this.supplierService.stores$.subscribe(
      (stores) => {
        this.dataSource = new MatTableDataSource<IStores>(stores);
      }
    );
  }

  ngOnDestroy(): void {
    this.storesSubscription.unsubscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

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
    this.router.navigate(['/store', row.id]);
  }

  deleteRowsPress() {
    const selectedRows: IStores[] = this.selection.selected;
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.supplierService.deleteStores(selectedRows).subscribe({
          next: () => {
            this.selection.clear();
            this._snackBar.openFromComponent(MessagePopupComponent, {
              duration: 3000,
              data: 'Selected items were deleted successfully',
            });
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
        this.supplierService.create(result).subscribe({
          next: () => {
            this._snackBar.openFromComponent(MessagePopupComponent, {
              duration: 3000,
              data: `Store ${result.Name} was created successfully`,
            });
          },
          error: (error) => {
            console.error('Error while creating', error);
          },
        });
      }
    });
  }
}
