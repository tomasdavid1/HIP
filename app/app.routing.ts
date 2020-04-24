import { RouterModule, Routes } from '@angular/router';

import { CountriesComponents} from "./countries/countries.component";

const app_routes: Routes = [
  { path: '',  pathMatch:'full', redirectTo: '/countries' },
  { path: 'countries', component: CountriesComponents }
];

export const app_routing = RouterModule.forRoot(app_routes);