import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnPageMockupComponent } from './column-page-mockup/column-page-mockup.component';
import { BannerDetailComponent } from './banner-detail/banner-detail.component';
import { LoginComponent } from './login/login.component';
import { CreateBannerComponent } from './create-banner/create-banner.component';


const routes: Routes = [
  { path: '', redirectTo: '/banners', pathMatch: 'full' },
  { path: 'banners', component: ColumnPageMockupComponent },
  { path: 'create-banner', component: CreateBannerComponent },
  { path: 'banner-detail/:id', component: BannerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
