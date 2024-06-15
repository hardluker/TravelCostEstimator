// src/app/flight-form/flight-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AirportsService } from '../services/airports.service';
import { Airport } from '../services/airports.service';
import { CommonModule } from '@angular/common';
import { FlightService } from '../services/flight.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [FormsModule, NgSelectModule, CommonModule],
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
            [items]="airports"
            required
          >
          </ng-select>
        </div>
        <div class="form-group">
          <label for="arrival-airport">Arrival Airport</label>
          <ng-select
            id="arrival-airport"
            name="arrivalAirport"
            [(ngModel)]="arrivalAirport"
            [items]="airports"
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
          <ng-select name="carrier" [(ngModel)]="carrier" [items]="carriers">
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
      <div *ngIf="empty" class="average-cost alert alert-danger">
        No results found
      </div>
    </div>
  `,
  styleUrls: ['./flight-form.component.css'],
})
export class FlightFormComponent implements OnInit {
  departureAirport: string = '';
  arrivalAirport: string = '';
  flightDate: string = '';
  carrier: string = '';
  averageCost: number = 0;
  searching: boolean = false;
  results: boolean = false;
  airportMap: { [key: string]: string } = {};
  airports: string[] = [];
  carriers: string[] = ['All', 'American Airlines', 'Delta', 'United'];
  empty: boolean = false;

  constructor(
    private airportsService: AirportsService,
    private flightService: FlightService
  ) {}

  ngOnInit() {
    this.airportsService.getAirports().subscribe(
      (data: Airport[]) => {
        this.airports = data.map(
          (airport) => `${airport.city}, ${airport.state} - ${airport.iata}`
        );
      },
      (error) => {
        console.error('Error retrieving airport data:', error);
      }
    );
  }

  onSubmit() {
    const fromEntityId = this.getEntityId(this.departureAirport);
    const toEntityId = this.getEntityId(this.arrivalAirport);
    const departDate = this.flightDate;
    this.searching = true;
    this.results = false;
    this.empty = false;

    this.flightService
      .getFlightItineraries(fromEntityId, toEntityId, departDate)
      .subscribe(
        (response) => {
          // Delay for 10 seconds before making the second request
          setTimeout(() => {
            this.flightService
              .getFlightItineraries(fromEntityId, toEntityId, departDate)
              .pipe(
                finalize(() => {
                  // This block will execute when the second observable stream completes,
                  // regardless of whether it completes successfully or with an error.
                  this.searching = false; // Set searching to false when search completes
                })
              )
              .subscribe(
                (secondResponse: any) => {
                  const itinerariesSecond: any[] =
                    secondResponse.data.itineraries;

                  // Filter itineraries by carrier
                  const filteredItineraries = itinerariesSecond.filter(
                    (itinerary: any) => {
                      return itinerary.legs.some((leg: any) => {
                        return leg.carriers.marketing.some((carrier: any) => {
                          return (
                            carrier.name === this.carrier ||
                            this.carrier === 'All'
                          );
                        });
                      });
                    }
                  );

                  // Calculate average cost for filtered itineraries
                  const totalCostSecond = filteredItineraries.reduce(
                    (sum: number, itinerary: any) => sum + itinerary.price.raw,
                    0
                  );
                  const averageCostSecond =
                    totalCostSecond / filteredItineraries.length;

                  this.averageCost = averageCostSecond;
                  if (filteredItineraries.length === 0) {
                    this.empty = true;
                  } else {
                    this.results = true;
                  }
                },
                (error) => {
                  // Handle error here
                  console.error('Error occurred:', error);
                  this.empty = true;
                }
              );
          }, 2000);
        },
        (error) => {
          // Handle error here
          console.error('Error occurred:', error);
          this.searching = false; // Set searching to false when search completes
          this.empty = true;
        }
      );
  }

  private getEntityId(airport: string): string {
    // Split the airport string by '-'
    const parts = airport.split('-');
    // Get the last part (which should be the airport code)
    const airportCode = parts[parts.length - 1].trim();
    return airportCode;
  }

  getKeys(map: any) {
    return Object.keys(map);
  }
}
