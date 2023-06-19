import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.css']
})
export class PatientsTableComponent {
  // @Input() data: any;
  constructor(public dialogRef: MatDialogRef<PatientsTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  infoPatient(data: any){
    // this.dialogRef.close(data)
  }

  editPatient(data: any) {
    console.log('edit patient', data)    
    var el = document.querySelector(".patient-form")
    el?.scrollIntoView()
    this.dialogRef.close(data)  
  }
}