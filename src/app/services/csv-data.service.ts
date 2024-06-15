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

  constructor() {}
}
