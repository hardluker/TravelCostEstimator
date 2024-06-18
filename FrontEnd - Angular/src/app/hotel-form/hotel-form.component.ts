import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CitiesServiceService, City } from '../services/cities-service.service';
import { HotelsService } from '../services/hotels.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { catchError, concatMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [NgSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css'],
})
export class HotelFormComponent {
  //Output of the average cost
  @Output() averageCostChanged = new EventEmitter<number>();

  hotelForm: FormGroup;
  cities: string[] = [];
  averageCost: number | null = null;
  searching: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private citiesService: CitiesServiceService,
    private hotelsService: HotelsService
  ) {
    this.hotelForm = this.fb.group({
      city: ['', Validators.required],
      checkinDate: ['', Validators.required],
      checkoutDate: ['', Validators.required],
    });
  }

  // A function that is called as the user types into the form.
  // The backend is querying dynamically and only if the length is atleast 3 characters
  onCityChange(city: string) {
    //console.log('Changing');
    if (city.length >= 3) {
      //console.log('Querying');
      this.citiesService.getCities(city).subscribe(
        (data: City[]) => {
          this.cities = data.map(
            (city) => `${city.city}, ${city.state} - ${city.county}`
          );
        },
        (error) => {
          console.error('Error retrieving city data:', error);
        }
      );
    }
  }

  //This is the function that is called once the form is submitted.
  onSubmit() {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }

    // Flags for displaying error messages and the spinner on the form
    this.searching = true;
    this.error = null;

    // Resetting the average cost to null
    this.averageCost = null;

    // Sanitizing the city, county, and state values.
    // The spaces are replaced with %20, the .'s are replaced with nothing.
    const cityInput = this.hotelForm.value.city;
    const [cityState, county] = cityInput.split(' - ');
    const [city, state] = cityState.split(', ');

    const sanitizedCity = city.replace(/\s/g, '%20').replace(/\./g, '');
    const sanitizedState = state.replace(/\s/g, '%20').replace(/\./g, '');
    const sanitizedCounty = county.replace(/\s/g, '%20').replace(/\./g, '');

    const checkinDate = this.hotelForm.value.checkinDate;
    const checkoutDate = this.hotelForm.value.checkoutDate;

    // Console logging for debugging sanitized inputs
    /*console.log(
      'City:',
      sanitizedCity,
      'State:',
      sanitizedState,
      'County:',
      sanitizedCounty
    ); */

    // Invoking the hotels service to get hotel costs
    this.hotelsService
      // First, getting the entity ID from the API based on the city and state
      .getEntityId(sanitizedCity, sanitizedState)
      //Next, piping that entity ID into the getHotelCosts
      .pipe(
        //Catching errors, displaying the error, and cancelling the search.
        catchError((error) => {
          this.searching = false;
          this.error = error.message;
          return throwError(error);
        }),
        //Passing the entity ID in the the getHotelCosts method.
        concatMap((entityId: string) =>
          this.hotelsService.getHotelCosts(entityId, checkinDate, checkoutDate)
        ),
        //Catching errors and setting appropriate flags
        catchError((error) => {
          this.searching = false;
          this.error = error.message;
          return throwError(error);
        })
      )
      // Subscribing to the average cost that is returned from the function to be used in the broader application.
      .subscribe((averageCost: number) => {
        this.searching = false;
        this.averageCost = averageCost;
        this.averageCostChanged.emit(this.averageCost); // emitting the average cost
      });
  }
}
