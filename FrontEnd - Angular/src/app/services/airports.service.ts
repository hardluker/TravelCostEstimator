// src/app/services/airport.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Airport {
  city: string;
  state: string;
  iata: string;
}

@Injectable({
  providedIn: 'root',
})
export class AirportsService {
  private apiUrl = 'http://52.237.33.210:8000//api/airports/';

  constructor(private http: HttpClient) {}

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.apiUrl);
  }
}
