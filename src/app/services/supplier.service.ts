import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  tap,
  throwError,
  forkJoin,
  map,
  BehaviorSubject,
} from 'rxjs';

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
  constructor(private http: HttpClient) {
    this.getAllStores().subscribe();
  }
  private storesSubject = new BehaviorSubject<IStores[]>([]);
  stores$: Observable<IStores[]> = this.storesSubject.asObservable();

  getAllStores(): Observable<IStores[]> {
    return this.http
      .get<IStores[]>('http://localhost:3000/api/Stores')
      .pipe(tap((stores) => this.storesSubject.next(stores)));
  }

  create(store: IStores): Observable<IStores> {
    return this.http
      .post<IStores>('http://localhost:3000/api/Stores', store)
      .pipe(
        tap((store) => {
          const currentStores = this.storesSubject.value;
          this.storesSubject.next([...currentStores, store]);
        })
      );
  }

  deleteStores(stores: IStores[]): Observable<void> {
    const deleteRequests: Observable<void>[] = stores.map((store) =>
      this.http.delete<void>(`http://localhost:3000/api/Stores/${store.id}`)
    );
    return forkJoin(deleteRequests).pipe(
      map(() => {
        const currentStores = this.storesSubject.value;
        stores.forEach((store) => {
          const index = currentStores.findIndex((s) => s.id === store.id);
          if (index !== -1) {
            currentStores.splice(index, 1);
          }
        });
        this.storesSubject.next([...currentStores]);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error.message);
      })
    );
  }
}
