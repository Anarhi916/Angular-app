import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SuppliersPageComponent } from './pages/suppliers-page/suppliers-page.component';
import { SuppliersDetailsComponent } from './pages/suppliers-details/suppliers-details.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  declarations: [AppComponent, SuppliersPageComponent, SuppliersDetailsComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
