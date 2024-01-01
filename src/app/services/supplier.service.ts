import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, forkJoin, map } from 'rxjs';

export interface IStores {
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
  stores: IStores[] = [];

  getAllStores(): Observable<IStores[]> {
    return this.http
      .get<IStores[]>('http://localhost:3000/api/Stores')
      .pipe(tap((stores) => (this.stores = stores)));
  }

  create(store: IStores): Observable<IStores> {
    return this.http
      .post<IStores>('http://localhost:3000/api/Stores', store)
      .pipe(tap((store) => this.stores.push(store)));
  }

  deleteStores(stores: IStores[]): Observable<void> {
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
