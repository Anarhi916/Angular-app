import { Component, OnInit } from '@angular/core';
import { ISuppliers, SupplierService } from '../../services/supplier.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-table',
  templateUrl: './supplier-table.component.html',
  styleUrl: './supplier-table.component.scss',
})
export class SupplierTableComponent implements OnInit {
  dataSource: MatTableDataSource<ISuppliers>;
  constructor(
    public supplierService: SupplierService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.supplierService.getAllStores().subscribe(() => {
      this.dataSource = new MatTableDataSource<ISuppliers>(
        this.supplierService.stores
      );
    });
  }
  displayedColumns: string[] = ['select', 'name', 'address', 'id'];

  selection = new SelectionModel<ISuppliers>(true, []);

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

  navToStoreDetails(row: ISuppliers) {
    this.router.navigate(['/supplier', row.id]);
  }

  deleteRowsPress() {
    const selectedRows: ISuppliers[] = this.selection.selected;
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.supplierService.deleteStores(selectedRows).subscribe({
          next: () => {
            this.selection.clear();
            this.supplierService.getAllStores().subscribe(() => {
              this.dataSource = new MatTableDataSource<ISuppliers>(
                this.supplierService.stores
              );
            });
          },
          error: (error) => {
            console.error('Error while deleting', error);
          },
        });
      }
    });
  }
}
