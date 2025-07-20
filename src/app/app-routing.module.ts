import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnPageMockupComponent } from './column-page-mockup/column-page-mockup.component';
import { BannerDetailComponent } from './banner-detail/banner-detail.component';
import { LoginComponent } from './login/login.component';
import { CreateBannerComponent } from './create-banner/create-banner.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
import { ProductTableComponent } from './product-table/product-table.component';
import { GetDataComponent } from './get-data/get-data.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { PinPageComponent } from './pin-page/pin-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GreetingPageComponent } from './greeting-page/greeting-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'pin', pathMatch: 'full' },
  { path: 'gallery', component: GalleryPageComponent },
  { path: 'pin', component: PinPageComponent  },
  { path: 'home', component: HomePageComponent },
  { path: 'game', component: GamePageComponent },
  { path: 'greeting', component: GreetingPageComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'getData', component: GetDataComponent },
  // { path: 'product', component: ProductTableComponent },
  { path: '**', redirectTo: 'pin' } // Redirect invalid routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }