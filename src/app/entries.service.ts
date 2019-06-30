import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {from, observable, Observable, of} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import {Entry} from './entry/entry';
import {Note} from './entry-details/note';

const entriesEndpoint = 'https://cors-anywhere.herokuapp.com/https://eu0f3f2sg9.execute-api.eu-central-1.amazonaws.com/Dev/interventions';
const notesEndpoint = 'https://cors-anywhere.herokuapp.com/https://eu0f3f2sg9.execute-api.eu-central-1.amazonaws.com/Dev/notes/';
const filesEndpoint = 'https://cors-anywhere.herokuapp.com/https://eu0f3f2sg9.execute-api.eu-central-1.amazonaws.com/Dev/files/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'})
};
@Injectable()
export class EntriesService {

  public currentId;

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
    return this.http.get(entriesEndpoint + '/?id=' + id).pipe(
      map(this.extractData));
  }

  addEntry (entry: Entry): Observable<any> {
    console.log(entry);
    return this.http.post<any>(entriesEndpoint , JSON.stringify(entry), httpOptions).pipe(
      tap((entry) => console.log(`added product w/ id=${entry.description}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  addNote (note: Note, id,user): Observable<any> {
    console.log(user);
    note.author = user;
    let body = ' { note: ' + JSON.stringify(note) + '}';
    console.log(body);
    return this.http.put<any>(notesEndpoint + id , body , httpOptions).pipe(
      tap((entry) => console.log(`added note w/ id=${note.title}`)),
      catchError(this.handleError<any>('addNote'))
    );
  }

  deleteProduct (id): Observable<any> {
    return this.http.delete<any>(entriesEndpoint + 'products/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  uploadFile (fileName): Observable<any> {
    return this.http.post<any>(filesEndpoint + 'uploadfile' ,
    ' { filename: ' + JSON.stringify(fileName) + ' } ', httpOptions).pipe(
      map(this.extractData)
    );
  }

  putFile (url, file): Observable<any> {
    return this.http.put<any>(url, file,
    new HttpHeaders({'Access-Control-Allow-Methods' : 'PUT'})).pipe(
      tap(_ => console.log(`putted file=${file.name}`)),
      catchError(this.handleError<any>('puttedFileError'))
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
