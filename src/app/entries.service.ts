import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {Entry} from './entry/entry';

const entriesEndpoint = 'https://cors-anywhere.herokuapp.com/https://eu0f3f2sg9.execute-api.eu-central-1.amazonaws.com/Dev/interventions';
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type":"application/json"})
};
@Injectable()
export class EntriesService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getEntries(): Observable<any> {
    return this.http.get(entriesEndpoint, httpOptions).pipe(
      map(this.extractData));
  }

  getEntry(id): Observable<any> {
    return this.http.get(entriesEndpoint + '/' + id).pipe(
      map(this.extractData));
  }

  addEntry (entry: Entry): Observable<any> {
    console.log(entry);
    return this.http.post<any>(entriesEndpoint , JSON.stringify(entry), httpOptions).pipe(
      tap((entry) => console.log(`added product w/ id=${entry.description}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  updateProduct (id, product): Observable<any> {
    return this.http.put(entriesEndpoint + 'products/' + id, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<any> {
    return this.http.delete<any>(entriesEndpoint + 'products/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
