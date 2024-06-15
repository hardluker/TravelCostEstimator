// src/app/flight.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

    return this.http.get<any>(this.apiUrl, { params, headers: this.headers });
  }
}
