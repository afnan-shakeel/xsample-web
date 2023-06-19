import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientRegisterComponent } from '../patient-register/patient-register.component';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent {
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<PatientInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){ }
  patientInfo: any = this.data;

  closeCard(){
    this.patientInfo = null
    this.dialogRef.close()
  }
}
