import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"add",loadChildren:()=>import('./add-news/add-news.module').then(module=> module.AddNewsModule)},
  {path:"newsList",loadChildren:()=>import('./news-list/news-list.module').then(module=> module.NewsListModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
