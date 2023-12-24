import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SuppliersPageComponent } from './pages/suppliers-page/suppliers-page.component';
import { SuppliersDetailsComponent } from './pages/suppliers-details/suppliers-details.component';
import { SupplierTableComponent } from './components/supplier-table/supplier-table.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  declarations: [
    AppComponent,
    SuppliersPageComponent,
    SuppliersDetailsComponent,
    SupplierTableComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
