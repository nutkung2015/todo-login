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
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
