import { Component, EventEmitter, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { ApiService } from '../../ApiService';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarService } from '../../services/snack-bar.service'

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent {
  constructor(private apiService: ApiService, private snackbar: SnackBarService) { }
  gender: string[] = ['MALE', 'FEMALE']
  selectedGender: string | undefined
  formData: any = {}
  selectDate!: Date;
  calculatedAge!: number;

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
  onDateChange(date: any) {
    this.calculatedAge = this.calculateAge(date)
    console.log('age = ', this.calculatedAge)
  }

  @Output() cancelEmitter: EventEmitter<any> = new EventEmitter();

  closeDrawer() {
    console.log("closeDrawer event")
    this.cancelEmitter.emit("close drawer message");
  }

  onSubmit(formData: any) {
    if (Object.keys(formData).length == 0) {
      this.snackbar.openSnackbar('error', 'empty input')
      return
    }
    const payload = formData
    payload.dob = this.selectDate
    payload.gender = this.selectedGender
    console.log('reg payload', payload)

    this.apiService.submitData('patient/register', payload).subscribe(
      (response: any) => {
        console.log(response)
        if (response.message.toLowerCase() == 'success') {
          this.snackbar.openSnackbar('success', 'registered')
          formData = {}
          this.closeDrawer()
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
