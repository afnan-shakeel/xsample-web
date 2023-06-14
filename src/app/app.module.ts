import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { PatientSearchComponent } from './components/patient-search/patient-search.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { PatientRegisterComponent } from './components/patient-register/patient-register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PatientComponent },
  { path: 'insurance', component: InsuranceComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientComponent,
    PatientSearchComponent,
    PatientRegisterComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
