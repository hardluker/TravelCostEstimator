import { Component, OnInit } from '@angular/core';
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

  onCityChange(city: string) {
    console.log('Changing');
    if (city.length >= 3) {
      console.log('Querying');
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

  onSubmit() {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }

    this.searching = true;
    this.error = null;
    this.averageCost = null;

    const cityInput = this.hotelForm.value.city;
    const [cityState, county] = cityInput.split(' - ');
    const [city, state] = cityState.split(', ');

    const sanitizedCity = city.replace(/\s/g, '%20');
    const sanitizedState = state.replace(/\s/g, '%20');
    const sanitizedCounty = county.replace(/\s/g, '%20');

    const checkinDate = this.hotelForm.value.checkinDate;
    const checkoutDate = this.hotelForm.value.checkoutDate;

    console.log(
      'City:',
      sanitizedCity,
      'State:',
      sanitizedState,
      'County:',
      sanitizedCounty
    );

    this.hotelsService
      .getEntityId(sanitizedCity, sanitizedState)
      .pipe(
        catchError((error) => {
          this.searching = false;
          this.error = error.message;
          return throwError(error);
        }),
        concatMap((entityId: string) =>
          this.hotelsService.getHotelCosts(entityId, checkinDate, checkoutDate)
        ),
        catchError((error) => {
          this.searching = false;
          this.error = error.message;
          return throwError(error);
        })
      )
      .subscribe((averageCost: number) => {
        this.searching = false;
        this.averageCost = averageCost;
      });
  }
}
