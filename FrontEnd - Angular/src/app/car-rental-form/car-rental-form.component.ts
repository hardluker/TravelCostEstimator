// src/app/car-rental-form/car-rental-form.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarRentalService } from '../services/car-rental.service';
import { CommonModule } from '@angular/common';
import { AirportsService } from '../services/airports.service';
import { Airport } from '../services/airports.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { concatMap, delay } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-car-rental-form',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  template: `
    <div class="card border-left-primary shadow py-1 h-100">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Car Rental</h6>
      </div>
      <form
        class="card-body d-flex flex-column justify-content-between flex-grow-1"
        (ngSubmit)="onSubmit()"
      >
        <div class="form-group">
          <label for="pickup-airport">Pickup Airport</label>
          <ng-select
            id="pickup-airport"
            name="pickupAirport"
            [(ngModel)]="pickupAirport"
            [items]="airports"
            required
          />
        </div>
        <div class="form-group mt-auto">
          <label for="pickup-date">Pickup Date</label>
          <input
            id="pickup-date"
            name="pickupDate"
            [(ngModel)]="pickupDate"
            class="form-control form-control-user"
            type="date"
            required
          />
        </div>
        <div class="form-group mt-auto">
          <label for="dropoff-date">Drop-Off Date</label>
          <input
            id="dropoff-date"
            name="dropoffDate"
            [(ngModel)]="dropoffDate"
            class="form-control form-control-user"
            type="date"
            required
          />
        </div>
        <div class="user form-group mt-auto">
          <button class="btn btn-primary" type="submit" [disabled]="searching">
            Submit
          </button>
        </div>
        <div
          *ngIf="searching"
          class="spinner-border text-primary"
          role="status"
        ></div>
      </form>
      <div *ngIf="results" class="alert alert-primary">
        Average Cost: {{ averageCost | currency }}
      </div>
    </div>
  `,
  styleUrls: ['./car-rental-form.component.css'],
})
export class CarRentalFormComponent {
  pickupAirport: string = '';
  pickupDate: string = '';
  dropoffDate: string = '';
  averageCost: number | null = null;
  airports: string[] = [];
  searching: boolean = false;
  results: boolean = false;

  constructor(
    private carRentalService: CarRentalService,
    private airportsService: AirportsService
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
    this.results = false;
    this.searching = true;
    const airportCode = this.getAirportCode(this.pickupAirport);

    if (!airportCode) {
      console.error('Invalid airport code.');
      return;
    }

    this.carRentalService
      .getEntityId(airportCode)
      .pipe(
        concatMap((entityId) => {
          if (!entityId) {
            console.error('Entity ID not found.');
            return throwError('Entity ID not found.');
          }
          console.log('Entity ID', entityId);

          return this.carRentalService
            .getCarRentalCosts(entityId, this.pickupDate, this.dropoffDate)
            .pipe(
              delay(2000), // Wait for 10 seconds before making the second request
              concatMap((carList) => {
                // Make the second request
                return this.carRentalService.getCarRentalCosts(
                  entityId,
                  this.pickupDate,
                  this.dropoffDate
                );
              })
            );
        })
      )
      .subscribe((carList) => {
        if (carList && carList.length > 0) {
          const totalCost = carList.reduce(
            (sum, car) => sum + car.min_price,
            0
          );
          this.averageCost = totalCost / carList.length;
          this.results = true;
        } else {
          this.averageCost = 0;
        }
        this.searching = false;
      });
  }

  private getAirportCode(airport: string): string {
    // Split the airport string by '-'
    const parts = airport.split('-');
    // Get the last part (which should be the airport code)
    console.log(parts[parts.length - 1].trim());
    return parts[parts.length - 1].trim();
  }
}
