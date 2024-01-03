import { Component } from '@angular/core';

@Component({
  selector: 'app-stores-page',
  templateUrl: './stores-page.component.html',
  styleUrl: './stores-page.component.scss',
})
export class StoresPageComponent {
  constructor() {}

  title: string = 'Stores';
  breadcrumbsItems = [{ label: 'Stores', link: '/' }];
}
