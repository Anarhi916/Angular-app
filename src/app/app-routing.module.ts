import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresPageComponent } from './pages/stores-page/stores-page.component';
import { SuppliersDetailsComponent } from './pages/suppliers-details/suppliers-details.component';

const routes: Routes = [
  {
    path: '',
    component: StoresPageComponent,
  },
  {
    path: 'supplier/:id',
    component: SuppliersDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
