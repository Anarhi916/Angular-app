import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, forkJoin, map } from 'rxjs';

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

  create(store: ISuppliers): Observable<ISuppliers> {
    return this.http
      .post<ISuppliers>('http://localhost:3000/api/Stores', store)
      .pipe(tap((store) => this.stores.push(store)));
  }

  deleteStores(stores: ISuppliers[]): Observable<void> {
    const deleteRequests: Observable<void>[] = stores.map((store) =>
      this.http.delete<void>(`http://localhost:3000/api/Stores/${store.id}`)
    );
    return forkJoin(deleteRequests).pipe(
      map(() => {}),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.message);
      })
    );
  }
}
