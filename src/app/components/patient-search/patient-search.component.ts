import { Component, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';
import { ApiService } from '../../ApiService';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddInsuranceComponent } from '../add-insurance/add-insurance.component'
import { SnackBarService } from '../../services/snack-bar.service'
import { PatientsTableComponent } from '../patients-table/patients-table.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NzButtonSize } from 'ng-zorro-antd/button';


@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class PatientSearchComponent {
  constructor(private apiService: ApiService, public dialog: MatDialog, private snackbar: SnackBarService) { }
  searchPatId?: number;
  searchCivilId?: number;
  searchMobile?: number;
  searchName?: string;
  suggestions: any[] = []
  allSuggestions: any[] = []
  ngOnInit() {
    this.fetchData()
  }

  fetchData() {
    this.apiService.fetchData('patient').subscribe(
      (response: any) => {
        console.log(response.data)
        this.allSuggestions = response.data
      },
      (error: any) => {
        console.error(error)
      }
    )
  }

  @Output() datasent = new EventEmitter<string>();
  onSearch() {
    this.generateSuggestions()
    this.openPatientTable(this.suggestions)
  }
  generateSuggestions() {
    this.suggestions = []
    for (const item of this.allSuggestions) {
      console.log()
      if (this.searchCivilId && item.civil_id
        && item.civil_id.toString().includes(this.searchCivilId?.toString())) {
          this.suggestions.push(item)
        continue
      }
      if (this.searchMobile && item.mobile_no
        && item.mobile_no.toString().includes(this.searchMobile?.toString())) {
          this.suggestions.push(item)
        continue
      }
      if (this.searchPatId && item.patient_id
        && item.patient_id.toString().includes(this.searchPatId?.toString())) {
          this.suggestions.push(item)
        continue
      }
      if (this.searchName && item.first_name
        && (item.first_name +' '+ item.middle_name +' '+ item.last_name).toString()
        .toLocaleLowerCase().includes(this.searchName?.toLocaleLowerCase().toString())) {
          this.suggestions.push(item)
        continue
      }
    }
    console.log('suggestions', this.suggestions)
  }
  @Input() editData = ""
  @Output() patEditEvent = new EventEmitter<any>();
  openPatientTable(data: any) {
    const patTableDialog = this.dialog.open(PatientsTableComponent, { data: { rows: this.suggestions } })
    patTableDialog.afterClosed().subscribe(
      (result) => {
        this.editData = result
        this.patEditEvent.emit(this.editData)
        console.log("dualog", this.editData)
      }
    )
  }

  clearInputs() {
    this.searchCivilId = undefined
    this.searchMobile = undefined
    this.searchPatId = undefined
    this.searchName = undefined
  }
  openAddDialog(patient_id: number): void {
    const dialogRef = this.dialog.open(AddInsuranceComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var payload = result
        payload.patient_id = patient_id
        this.apiService.postData('insurance/register-patient', payload).subscribe(
          (response: any) => {
            if (response.message != 'success') {
              console.log('err res', response.data)
              this.snackbar.openSnackbar('error', 'insurance registeration failed')
              throw Error('failed')
            }
            this.snackbar.openSnackbar('success', 'insurance register success')
          },
          (error: any) => {
            console.log('err res', error)
            this.snackbar.openSnackbar('error', 'insurance register failed')
          }
        )
      }

    }
    );
  }
  editPatient(data: any) {
    // var el = document.querySelector(".register-form")
    // el?.scrollIntoView()
    this.datasent.emit(data)
  }
  @Output() testOutData = new EventEmitter<string>();
  applyOutData() {
    this.testOutData.emit("testOutData")
    console.log('click applyOutData')
  }
}
