// src/app/flight-form/flight-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AirportsService } from '../services/airports.service';
import { Airport } from '../services/airports.service';
import { CommonModule } from '@angular/common';

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

  constructor(private airportsService: AirportsService) {}

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

    // Simulate a flight service call
    setTimeout(() => {
      this.averageCost = Math.random() * 500; // Random cost for demonstration
      this.searching = false;
      this.results = true;
    }, 2000);
  }

  private getEntityId(airport: string): string {
    return this.airportMap[airport] || '';
  }

  getKeys(map: any) {
    return Object.keys(map);
  }
}
