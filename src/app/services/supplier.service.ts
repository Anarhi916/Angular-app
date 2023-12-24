import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, retry, tap, throwError } from 'rxjs';

export interface ISuppliers {
  Name: string;
  Email: string;
  PhoneNumber: string;
  Address: string;
  Established: string;
  FloorArea: number;
  id?: number;
}
@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}
  stores: ISuppliers[] = [];

  getAllStores(): Observable<ISuppliers[]> {
    return this.http
      .get<ISuppliers[]>('http://localhost:3000/api/Stores')
      .pipe(tap((stores) => (this.stores = stores)));
  }
}
