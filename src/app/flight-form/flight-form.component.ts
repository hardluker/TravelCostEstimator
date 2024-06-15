// src/app/flight-form/flight-form.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  template: `
    <div class="card border-left-primary shadow py-1">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Flight</h6>
      </div>
      <form class="card-body" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="departure-airport">Departure Airport</label>
          <ng-select
            id="departure-airport"
            name="departureAirport"
            [(ngModel)]="departureAirport"
            [items]="names"
            name="departureAirport"
            required
          >
          </ng-select>
        </div>
        <div class="form-group">
          <label for="arrival-airport">Arrival Airport</label>

          <ng-select
            id="arrival-airport"
            name="arrivalAirport"
            [(ngModel)]="departureAirport"
            [items]="getKeys(airportMap)"
            name="arrivalAirport"
            required
          >
          </ng-select>
        </div>
        <div class="form-group">
          <label for="flight-date">Date</label>
          <input
            id="flight-date"
            [(ngModel)]="flightDate"
            name="flightDate"
            class="form-control form-control-user"
            type="date"
            required
          />
        </div>
        <div class="user form-group">
          <label for="carrier">Carrier</label>
          <ng-select
            name="carrier"
            [(ngModel)]="carrier"
            [items]="getKeys(airportMap)"
          >
          </ng-select>
        </div>
        <div class="user form-group">
          <button class="btn btn-primary" type="submit" [disabled]="searching">
            Search
          </button>
        </div>
      </form>
      <div
        *ngIf="searching"
        class="spinner-border text-primary"
        role="status"
      ></div>
      <div *ngIf="results" class="average-cost alert alert-primary">
        Average Cost: {{ averageCost | currency }}
      </div>
    </div>

    <datalist id="airports">
      <option value="San Francisco, CA - SFO"></option>
      <option value="Nashville, TN - BNA"></option>
      <!-- Add more airports as needed -->
    </datalist>
  `,
  styleUrls: ['./flight-form.component.css'],
})
export class FlightFormComponent {
  departureAirport: string = '';
  arrivalAirport: string = '';
  flightDate: string = '';
  carrier: string = '';
  averageCost: number = 0;
  searching: boolean = false;
  results: boolean = false;
  airportMap: { [key: string]: string } = {
    'San Francisco, CA - SFO': 'SFO',
    'Nashville, TN - BNA': 'BNA',
    // Add more mappings as needed
  };
  names: string[] = ['John', 'Jane', 'Doe'];

  constructor(private flightService: FlightService) {}

  onSubmit() {
    const fromEntityId = this.getEntityId(this.departureAirport);
    const toEntityId = this.getEntityId(this.arrivalAirport);
    const departDate = this.flightDate;
    this.searching = true;

    this.flightService
      .getFlightItineraries(fromEntityId, toEntityId, departDate)
      .subscribe(() => {
        // Delay for 10 seconds before making the second request
        setTimeout(() => {
          this.flightService
            .getFlightItineraries(fromEntityId, toEntityId, departDate)
            .subscribe((secondResponse) => {
              // Second response processing
              const itinerariesSecond = secondResponse.data.itineraries;
              const totalCostSecond = itinerariesSecond.reduce(
                (sum: number, itinerary: any) => sum + itinerary.price.raw,
                0
              );
              this.averageCost = totalCostSecond / itinerariesSecond.length;
              this.searching = false; // Set searching to false when search completes
              this.results = true;
            });
        }, 10000);
      });
  }

  private getEntityId(airport: string): string {
    return this.airportMap[airport] || '';
  }
  getKeys(map: any) {
    return Object.keys(map);
  }
}
