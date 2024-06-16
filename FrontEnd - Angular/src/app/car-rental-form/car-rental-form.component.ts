import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './car-rental-form.component.html',
  styleUrls: ['./car-rental-form.component.css'],
})
export class CarRentalFormComponent {
  carRentalForm: FormGroup;
  airports: string[] = [];
  searching: boolean = false;
  results: boolean = false;
  empty: boolean = false;
  averageCost: number | null = null;

  constructor(
    private fb: FormBuilder,
    private carRentalService: CarRentalService,
    private airportsService: AirportsService
  ) {
    this.carRentalForm = this.fb.group({
      pickupAirport: ['', Validators.required],
      pickupDate: ['', Validators.required],
      dropoffDate: ['', Validators.required],
    });
  }

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
    if (this.carRentalForm.invalid) {
      this.carRentalForm.markAllAsTouched();
      return;
    }

    this.empty = false;
    this.results = false;
    this.searching = true;

    const airportCode = this.getAirportCode(
      this.carRentalForm.value.pickupAirport
    );

    if (!airportCode) {
      console.error('Invalid airport code.');
      return;
    }

    this.carRentalService
      .getEntityId(airportCode)
      .pipe(
        concatMap((entityId) => {
          if (!entityId) {
            this.searching = false;
            this.empty = true;
            console.error('Entity ID not found.');
            return throwError('Entity ID not found.');
          }

          return this.carRentalService
            .getCarRentalCosts(
              entityId,
              this.carRentalForm.value.pickupDate,
              this.carRentalForm.value.dropoffDate
            )
            .pipe(
              delay(2000), // Wait for 2 seconds before making the second request
              concatMap((carList) => {
                return this.carRentalService.getCarRentalCosts(
                  entityId,
                  this.carRentalForm.value.pickupDate,
                  this.carRentalForm.value.dropoffDate
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
    const parts = airport.split('-');
    return parts[parts.length - 1].trim();
  }
}
