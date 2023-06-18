import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../ApiService';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddInsuranceComponent } from '../add-insurance/add-insurance.component'
import { SnackBarService } from '../../services/snack-bar.service'


@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent {
  constructor(private apiService: ApiService, public dialog: MatDialog, private snackbar: SnackBarService) { }
  searchTerm: string = '';
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
  onInputChange() {
    this.generateSuggestions()
  }
  generateSuggestions() {
    this.suggestions = []
    if (this.searchTerm == '') {
      this.suggestions = []
      return
    }
    // this.suggestions = this.allSuggestions.filter(suggestion => suggestion.toLowerCase().includes(this.searchTerm.toLowerCase()))
    for (const item of this.allSuggestions) {
      if (item.civil_id && item.civil_id.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.patient_id && item.patient_id.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.mobile_no && item.mobile_no.toString().toLowerCase().includes(this.searchTerm.toLowerCase())) {

        this.suggestions.push(item)
      }
    }
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
              this.snackbar.openSnackbar('error', 'insurance register failed')
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
    var el = document.querySelector(".register-form")
    el?.scrollIntoView()
    this.datasent.emit(data)  
  }
  @Output() testOutData = new EventEmitter<string>();
  applyOutData() {
    this.testOutData.emit("testOutData")
    console.log('click applyOutData')
  }
}
