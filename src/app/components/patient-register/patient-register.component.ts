import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../ApiService';
import { SnackBarService } from '../../services/snack-bar.service'

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnChanges {
  constructor(private apiService: ApiService, private snackbar: SnackBarService) { }
  gender: any[] = [{ value: 'M', text: 'MALE' }, { id: 'F', text: 'FEMALE' }]

  formData: any = {}
  calculatedAge!: number;
  insuranceCompany: any[] = []
  @Input() recievedData: any;

  ngOnInit() {
    this.apiService.fetchData('insurance').subscribe(
      (response) => {
        console.log('ins res ', response)
        if (response.message != 'success') {
          this.snackbar.openSnackbar('error', 'failed to fetch insurance list')
        }
        this.insuranceCompany = response.data
      },
      (error) => {
        console.error(error)
      }
    )
  }
  calculateAge(dateOfBirth: any) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.recievedData && changes.recievedData.currentValue) {
      console.log(changes.recievedData)
      let temp_form = changes.recievedData.currentValue
      if (temp_form.patient_insurance.length > 0) {
        for (let item of Object.keys(temp_form.patient_insurance[0])) {
          console.log(item)
          temp_form[item] = temp_form.patient_insurance[0][item]
        }
        console.log('temp_obj ', temp_form)
      }
      this.formData = temp_form
    }
  }
  onDobChange(date: any) {
    this.calculatedAge = this.calculateAge(date)
    console.log('age = ', this.calculatedAge)
  }

  resetForm() {
    this.formData = {}
  }

  onSubmit(formData: any) {
    if (Object.keys(formData).length == 0 || !formData.civil_id || !formData.mobile_no) {
      this.snackbar.openSnackbar('error', 'fill required fields')
      return
    }
    const payload = formData
    console.log('reg payload', payload)

    this.apiService.submitData('patient/register', payload).subscribe(
      (response: any) => {
        console.log(response)
        if (response.message.toLowerCase() == 'success') {
          this.snackbar.openSnackbar('success', 'registered')
          this.formData = {}
        } else {
          this.snackbar.openSnackbar('error', response.data)
        }
      },
      (error: any) => {
        console.error(error)
        this.snackbar.openSnackbar('error', 'failed')
      }
    )

  }

}
