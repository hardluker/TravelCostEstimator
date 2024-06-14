// src/app/services/csv-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CsvDataService {
  private csvUrl = 'assets/usa-airports.csv'; // Path to your CSV file

  constructor(private http: HttpClient) {}

  getAirportData(): Observable<any[]> {
    return this.http
      .get(this.csvUrl, { responseType: 'text' })
      .pipe(map((data) => this.csvToArray(data)));
  }

  private csvToArray(csv: string): any[] {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj: any = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  }
}
