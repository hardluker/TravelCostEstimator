import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = 'https://sky-scanner3.p.rapidapi.com/flights/search-one-way';
  private headers = new HttpHeaders({
    'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
    'x-rapidapi-key': '0c6ac5663amsh49d8056d1816605p185d35jsn82788213cf8c',
  });

  constructor(private http: HttpClient) {}

  // Function to get all flights from the skyscanner API
  getFlightItineraries(
    fromEntityId: string,
    toEntityId: string,
    departDate: string
  ): Observable<any> {
    const params = {
      fromEntityId,
      toEntityId,
      departDate,
    };

    return this.http
      .get<any>(this.apiUrl, { params, headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
