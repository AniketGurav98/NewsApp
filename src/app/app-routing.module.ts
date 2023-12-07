import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { PrimaryUserComponent } from './primary-user/primary-user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"primaryUser",component:PrimaryUserComponent},
  {path:"add",loadChildren:()=>import('./add-news/add-news.module').then(module=> module.AddNewsModule),canActivate: [AuthGuard] },
  {path:"",loadChildren:()=>import('./news-list/news-list.module').then(module=> module.NewsListModule)},
  {path:"detail/:id",component:DetailArticleComponent},
  {path:"contact-us",component:ContactUsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
