import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AirportsService } from '../services/airports.service';
import { Airport } from '../services/airports.service';
import { CommonModule } from '@angular/common';
import { FlightService } from '../services/flight.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-flight-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, CommonModule],
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css'],
})
export class FlightFormComponent implements OnInit {
  //Output of the average cost
  @Output() averageCostChanged = new EventEmitter<number>();

  flightForm: FormGroup;
  averageCost: number = 0;
  searching: boolean = false;
  results: boolean = false;
  airports: string[] = [];
  carriers: string[] = ['All', 'American Airlines', 'Delta', 'United'];
  empty: boolean = false;

  constructor(
    private fb: FormBuilder,
    private airportsService: AirportsService,
    private flightService: FlightService
  ) {
    this.flightForm = this.fb.group({
      departureAirport: ['', Validators.required],
      arrivalAirport: ['', Validators.required],
      flightDate: ['', Validators.required],
      carrier: ['All'],
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
    if (this.flightForm.invalid) {
      return;
    }

    const fromEntityId = this.getEntityId(
      this.flightForm.value.departureAirport
    );
    const toEntityId = this.getEntityId(this.flightForm.value.arrivalAirport);
    const departDate = this.flightForm.value.flightDate;
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
                            carrier.name === this.flightForm.value.carrier ||
                            this.flightForm.value.carrier === 'All'
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
                  this.averageCostChanged.emit(this.averageCost); // emitting the average cost
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
}
