import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { StoresPageComponent } from './pages/stores-page/stores-page.component';
import { SuppliersDetailsComponent } from './pages/suppliers-details/suppliers-details.component';
import { SupplierTableComponent } from './components/supplier-table/supplier-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  declarations: [
    AppComponent,
    StoresPageComponent,
    SuppliersDetailsComponent,
    SupplierTableComponent,
    DeleteDialogComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
