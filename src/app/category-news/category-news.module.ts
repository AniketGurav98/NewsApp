import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportsRoutingModule } from './category-routing.module';
import { SportsComponent } from './sports/sports.component';
import { WeatherComponent } from './weather/weather.component';
import { PoliticsComponent } from './politics/politics.component';


@NgModule({
  declarations: [
    SportsComponent,
    WeatherComponent,
    PoliticsComponent
  ],
  imports: [
    CommonModule,
    SportsRoutingModule
  ]
})
export class SportsModule { }
