import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientRegisterComponent } from '../patient-register/patient-register.component';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent {
  constructor(public dialog: MatDialog){}
  @Input() patientInfo: any;

  closeCard(){
    this.patientInfo = null
  }
  editDialog(data: any){
    console.log('patientInfo to edit',data)
    const editDialogRef = this.dialog.open(PatientRegisterComponent,{data:{editEventData: data}})
    editDialogRef.afterClosed().subscribe(
      (result)=>{
        console.log('afterClosed of edit dialog', result)
      }
    )

  }
}
