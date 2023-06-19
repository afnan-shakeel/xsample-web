import { Component,EventEmitter,Input,Output } from '@angular/core';
import { ApiService } from '../ApiService';
import { ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { PatientSearchComponent } from '../components/patient-search/patient-search.component';
import { PatientRegisterComponent } from '../components/patient-register/patient-register.component';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})

export class PatientComponent {
  constructor(private apiService: ApiService, public dialog: MatDialog) { }
  searchTerm = ''
  ngOnInit() {
    this.apiService.fetchData('insurance').subscribe(
      (response:any) => {
        console.log(response)
      },
      (error:any) => {
        console.error(error)
      }
    )
  }
  isDrawerOpen = false;

  @Input() editEventData: any;
  handlePatEdit(data: any){
    this.editEventData = data
    console.log('recieved data from sugg edit',this.editEventData)

  }
  patientInfo: any;
  openSearchDialog():void {
    const searchDialogRef  = this.dialog.open(PatientSearchComponent,{ data:{content:"dialog content"}})
    searchDialogRef.afterClosed().subscribe(
      (result)=>{
        console.log('afterClosed of search dialog', result)
        this.patientInfo = result
      }
    )
  }
  openAddDialog(){
    const addDialogRef = this.dialog.open(PatientRegisterComponent,{data:{editEventData: null}})
    addDialogRef.afterClosed().subscribe(
      (result)=>{
        console.log('afterClosed of add dialog', result)
      }
    )
  }
  @Input() handledInData?: string;
  handleOutData(data:any){
    console.log('handled outData', data)
    this.handledInData = data
  }
  checkInData(){
    console.log('checking inData',this.handledInData)
  }
}
