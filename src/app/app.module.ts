import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule, MatDialogRef,MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { HttpClientModule } from '@angular/common/http'
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
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
import { AddInsuranceComponent } from './components/add-insurance/add-insurance.component';
import { InsuranceRegisterComponent } from './components/insurance-register/insurance-register.component';
import { ApiService } from './ApiService';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/patient', pathMatch: 'full' },
  { path: 'patient', component: PatientComponent },
  { path: 'insurance', component: InsuranceComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PatientComponent,
    InsuranceComponent,
    PatientSearchComponent,
    PatientRegisterComponent,
    AddInsuranceComponent,
    InsuranceRegisterComponent,
    PatientInfoComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatToolbarModule,
    MatListModule,
    
    MatTooltipModule,
    MatDividerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    
    MatCardModule,
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
  providers: [ApiService,MatDialog,{provide:MatDialogRef,useValue:{}},{ provide: MAT_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
