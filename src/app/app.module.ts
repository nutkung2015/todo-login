import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, AbstractControl, FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';

//main
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
//compo
import { LoginComponent } from './login/login.component';
import { LoginErrorDialogComponent } from './login-error-dialog/login-error-dialog.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { RegisterComponent } from './register/register.component';
import { TodoPraticeComponent } from './todo-pratice/todo-pratice.component';
import { TestRequestComponent } from './test-request/test-request.component';
import { HttpClientModule } from '@angular/common/http';
import { ColumnPageComponent } from './column-page/column-page.component';
import { ModelPageComponent } from './model-page/model-page.component';
import { CreateBannerComponent } from './create-banner/create-banner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ColumnPageMockupComponent } from './column-page-mockup/column-page-mockup.component';
import { BannerDetailComponent } from './banner-detail/banner-detail.component';
import { UpdateBannerDialogComponent } from './update-banner-dialog/update-banner-dialog.component';
import { AuthService } from './services/auth.service';
// import { BrandNamePipe } from './product-table/brand-name.pipe';

//environment
import { environment } from 'src/environments/environment';

//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { GetDataComponent } from './get-data/get-data.component';
import { ProductTableComponent } from './product-table/product-table.component'
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { PinPageComponent } from './pin-page/pin-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { GreetingPageComponent } from './greeting-page/greeting-page.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginErrorDialogComponent,
    AlertDialogComponent,
    RegisterComponent,
    TodoPraticeComponent,
    TestRequestComponent,
    ColumnPageComponent,
    ModelPageComponent,
    CreateBannerComponent,
    NavbarComponent,
    ColumnPageMockupComponent,
    BannerDetailComponent,
    UpdateBannerDialogComponent,
    GetDataComponent,
    ProductTableComponent,
    //shebew
    GalleryPageComponent,
    PinPageComponent,
    HomePageComponent,
    GamePageComponent,
    GreetingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatNativeDateModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatCardModule,
    DragDropModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,  // For Authentication
    AngularFireDatabaseModule,  // For Realtime Database
    AngularFirestoreModule,
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
