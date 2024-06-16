import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface City {
  city: string;
  state: string;
  county: string;
}

@Injectable({
  providedIn: 'root',
})
export class CitiesServiceService {
  private apiUrl = 'http://localhost:8000/api/cities/';

  constructor(private http: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }
}
