import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root',
})
export class CsvDataService {
  private csvUrl = 'assets/usa-airports.csv';

  constructor(private papa: Papa) {}

  async getAirports(): Promise<string[]> {
    try {
      const response = await fetch(this.csvUrl);
      const csvText = await response.text();

      const result = this.papa.parse(csvText);

      if (result.errors.length > 0) {
        throw new Error('Error parsing CSV file');
      }

      return result.data.map(
        (row: any) => `${row.city}, ${row.state} - ${row.iata}`
      );
    } catch (error) {
      console.error('Error fetching/parsing CSV file:', error);
      throw error;
    }
  }
}
