import { Component, EventEmitter, Output } from '@angular/core';
// import { FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../../ApiService';
import { SnackBarService } from '../../services/snack-bar.service'

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent {
  constructor(private apiService: ApiService, private snackbar: SnackBarService) { }
  gender: string[] = ['MALE', 'FEMALE']

  formData: any = {}
  calculatedAge!: number;
  insuranceCompany: any[] = []

  ngOnInit(){
    this.apiService.fetchData('insurance').subscribe(
      (response)=>{
        console.log('ins res ',response)
        if(response.message!='success'){
           this.snackbar.openSnackbar('error','failed to fetch insurance list')
        }
        this.insuranceCompany = response.data
      },
      (error)=>{
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
  onDobChange(date: any) {
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
