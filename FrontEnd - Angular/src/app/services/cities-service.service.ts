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
  constructor(private http: HttpClient) {}

  getCities(search: string): Observable<City[]> {
    const apiUrl: string = `https://travel-estimator.com/api/cities/?search=${search}`;
    return this.http.get<City[]>(apiUrl);
  }
}
