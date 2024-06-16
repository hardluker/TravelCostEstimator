import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { map, retryWhen, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  private apiHost = 'sky-scanner3.p.rapidapi.com';
  private apiKey = '0c6ac5663amsh49d8056d1816605p185d35jsn82788213cf8c';

  constructor(private http: HttpClient) {}

  getEntityId(city: string, state: string): Observable<string> {
    const query = `${city}%20${state}&market=US`;
    const url = `https://${this.apiHost}/hotels/auto-complete?query=${query}`;
    const headers = new HttpHeaders({
      'x-rapidapi-host': this.apiHost,
      'x-rapidapi-key': this.apiKey,
    });

    return this.http.get<any>(url, { headers }).pipe(
      map((response) => {
        const cityData = response.data.find(
          (item: any) => item.class === 'City'
        );
        if (cityData) {
          return cityData.entityId;
        } else {
          throw new Error('City not found');
        }
      })
    );
  }

  getHotelCosts(
    entityId: string,
    checkin: string,
    checkout: string
  ): Observable<number> {
    const url = `https://${this.apiHost}/hotels/search?entityId=${entityId}&checkin=${checkin}&checkout=${checkout}`;
    const headers = new HttpHeaders({
      'x-rapidapi-host': this.apiHost,
      'x-rapidapi-key': this.apiKey,
    });

    return this.http.get<any>(url, { headers }).pipe(
      map((response) => {
        const hotelCards = response.data.results.hotelCards;
        if (!hotelCards.length) throw new Error('No hotels found');

        const totalCost = hotelCards.reduce(
          (sum: number, card: any) => sum + card.lowestPrice.rawBasePrice,
          0
        );
        return totalCost / hotelCards.length;
      }),
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((error, index) => {
            if (index < 2) {
              // Retry up to 2 times
              return timer(5000); // Delay for 10 seconds
            }
            return throwError(error);
          })
        )
      )
    );
  }
}
