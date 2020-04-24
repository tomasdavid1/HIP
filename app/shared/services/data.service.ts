import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { ICountry } from '../interfaces';

@Injectable()
export class DataService {
    
    private url: string = 'api/dataservice/';
    
    constructor(private http: Http) { }
    
    getCountriesSummary() : Observable<ICountry[]> {
        return this.http.get(this.url + 'countries')
                   .map((resp: Response) => resp.json())
                   .catch(this.handleError);
    }
    
    updateCountry(country: ICountry) {
      return this.http.put(this.url + 'putCustomer/' + country.id, country)
                 .map((response: Response) => response.json())
                 .catch(this.handleError);
    }
    
    handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}

