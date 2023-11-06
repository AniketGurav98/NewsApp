import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './news-list.component';
import { RouterModule, Routes } from '@angular/router';


const listRoutes: Routes = [

  {path:"",component:NewsListComponent},
];

@NgModule({
  declarations: [
    NewsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(listRoutes),

  ]
})
export class NewsListModule { }
