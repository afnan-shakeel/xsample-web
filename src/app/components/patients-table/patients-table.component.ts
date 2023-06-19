import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PatientInfoComponent } from '../patient-info/patient-info.component';

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css']
})
export class PatientsTableComponent {
  // @Input() data: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PatientsTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  infoPatient(data: any){
    // this.dialogRef.close(data)
    const patInfoDialog = this.dialog.open(PatientInfoComponent,{data: data})
    patInfoDialog.afterClosed().subscribe(

    )
  }

  editPatient(data: any) {
    console.log('edit patient', data)    
    var el = document.querySelector(".patient-form")
    el?.scrollIntoView()
    this.dialogRef.close(data)  
  }
}