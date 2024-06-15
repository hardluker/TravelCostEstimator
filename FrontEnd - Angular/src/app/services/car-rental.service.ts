// src/app/services/car-rental.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CarRentalResponse {
  data: {
    carList: { min_price: number }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class CarRentalService {
  private readonly apiUrl = 'https://sky-scanner3.p.rapidapi.com';
  private readonly headers = new HttpHeaders({
    'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
    'x-rapidapi-key': '0c6ac5663amsh49d8056d1816605p185d35jsn82788213cf8c',
  });

  constructor(private http: HttpClient) {}

  getEntityId(airportCode: string): Observable<string | null> {
    const url = `${this.apiUrl}/cars/auto-complete?query=${airportCode}`;
    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map((response) => {
        const airport = response.data.find(
          (item: any) => item.class === 'Airport'
        );
        return airport ? airport.entity_id : null;
      })
    );
  }

  getCarRentalCosts(
    entityId: string,
    pickupDate: string,
    dropoffDate: string
  ): Observable<any[]> {
    const pickUpTime = '08%3A00';
    const dropOffTime = '18%3A00';
    const url = `${this.apiUrl}/cars/search?pickUpEntityId=${entityId}&pickUpDate=${pickupDate}&pickUpTime=${pickUpTime}&dropOffDate=${dropoffDate}&dropOffTime=${dropOffTime}`;
    return this.http
      .get<any>(url, { headers: this.headers })
      .pipe(map((response) => response.data.carList || []));
  }
}
