import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsComponent } from './sports/sports.component';
import { WeatherComponent } from './weather/weather.component';
import { PoliticsComponent } from './politics/politics.component';

const routes: Routes = [
  {path:"sports",component:SportsComponent},
  {path:"weather",component:WeatherComponent},
  {path:"politics",component:PoliticsComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }
