import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresPageComponent } from './pages/stores-page/stores-page.component';
import { StoresDetailsComponent } from './pages/stores-details/stores-details.component';

const routes: Routes = [
  {
    path: '',
    component: StoresPageComponent,
  },
  {
    path: 'supplier/:id',
    component: StoresDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
