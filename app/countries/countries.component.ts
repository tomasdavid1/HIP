import { Component, OnInit } from '@angular/core';

import { DataService } from '../shared/services/data.service';
import { ICountry } from '../shared/interfaces';

@Component({
    selector: 'customers',
    templateUrl: './countries.component.html'
})


export class CountriesComponents implements OnInit {

    countries: ICountry[] = [];
    editId: number = 0;
    errorMessage: string;

    constructor(private dataService: DataService) {  }

    ngOnInit() {
        this.dataService.getCountriesSummary()
            .subscribe((data: ICountry[]) => this.countries = data);
    }

    save(country: ICountry) {
        this.dataService.updateCountry(country)
            .subscribe((status: boolean) => {
                if (status) {
                    this.editId = 0;
                } else {
                    this.errorMessage = 'Unable to save country';
                }
            })
    }

}