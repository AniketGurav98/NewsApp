import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewsComponent } from './add-news.component';
import { RouterModule, Routes } from '@angular/router';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


const addRoutes: Routes = [

  {path:"",component:AddNewsComponent},
];

@NgModule({
  declarations: [
    AddNewsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(addRoutes),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),

  ]
})
export class AddNewsModule { }
