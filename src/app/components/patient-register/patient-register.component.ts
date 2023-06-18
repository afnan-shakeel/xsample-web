import { ChangeDetectorRef, Component, Inject, ViewChild, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../ApiService';
import { SnackBarService } from '../../services/snack-bar.service'
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnChanges {
  constructor(private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private snackbar: SnackBarService,
    public dialogRef: MatDialogRef<PatientRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  gender: any[] = [{ value: 'M', text: 'MALE' }, { value: 'F', text: 'FEMALE' }]

  // formData: any = {}
  @ViewChild('formData') formData?: NgForm;
  calculatedAge!: number;
  insuranceCompany: any[] = []
  @Input() editData: any;

  ngOnInit() {
    this.apiService.fetchData('insurance').subscribe(
      (response: any) => {
        console.log('ins res ', response)
        if (response.message != 'success') {
          this.snackbar.openSnackbar('error', 'failed to fetch insurance list')
        }
        this.insuranceCompany = response.data
      },
      (error: any) => {
        console.error(error)
      }
    );
  }
  ngAfterViewInit(): void {
    this.editData = this.data.editEventData
    var formValues = this.normEditData(this.editData)
    setTimeout(() => {
      this.formData?.form.patchValue(formValues)
    }, 0);

    this.cdr.detectChanges();
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
  normEditData(edit_data: any) {
    let temp_form = edit_data
    if (temp_form.patient_insurance.length > 0) {
      for (let item of Object.keys(temp_form.patient_insurance[0])) {
        temp_form[item] = temp_form.patient_insurance[0][item]
      }
    }
    temp_form.age = this.calculateAge(temp_form.dob)
    console.log("temp_form", temp_form)
    return temp_form
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  onDobChange(date: any) {
    this.calculatedAge = this.calculateAge(date)
    console.log('age = ', this.calculatedAge)
  }

  resetForm() {
    this.formData?.resetForm()
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.snackbar.openSnackbar('error', 'fill required fields')
      return
    }
    const payload = form.value
    console.log('reg payload', payload)
    if (payload.ins_id == "") payload.ins_id = null
    // if (payload.dob == "") payload.dob = null
    Object.keys(payload).forEach(key => {
      if(payload[key]==="") payload[key]=null;
    });
    this.apiService.postData('patient/register', payload).subscribe(
      (response: any) => {
        console.log(response)
        if (response.message.toLowerCase() == 'success') {
          this.editData = null
          this.resetForm()
          window.location.reload();
          this.snackbar.openSnackbar('success', 'registered')
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
