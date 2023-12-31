import { ChangeDetectorRef, Component, Inject, ViewChild, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../../ApiService';
import { SnackBarService } from '../../services/snack-bar.service'
import { NgForm, Validators, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnChanges {

  patientForm: FormGroup;

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private snackbar: SnackBarService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<PatientRegisterComponent>,

  ) {
    this.patientForm = new FormGroup({
      insurItems: new FormArray([]),
      civil_id: new FormControl()
    })
  }

  gender: any[] = [{ value: 'M', text: 'MALE' }, { value: 'F', text: 'FEMALE' }]

  calculatedAge?: number | null;
  insuranceCompany: any[] = []
  today = new Date(); 
  @Input() editData: any;

  ngOnInit() {
    this.buildForm()
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
    this.cdr.detectChanges();
  }
  buildForm() {
    this.patientForm = this.formBuilder.group({
      patient_id: [''],
      civil_id: ['', Validators.required],
      mobile_no: ['', Validators.required],
      first_name: ['', []],
      last_name: ['', []],
      middle_name: ['', []],
      address: ['', []],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      insurance: this.formBuilder.array([])
    })
  }
  get insuranceControls() {
    return this.patientForm.get('insurance') as FormArray
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
    if (changes.editData && changes.editData.currentValue) {
      let age = changes.editData.currentValue.dob ? this.calculateAge(changes.editData.currentValue.dob) : null
      this.patientForm.patchValue(changes.editData.currentValue)
      this.calculatedAge = age
      this.setInitialInsuranceValues(changes.editData.currentValue.patient_insurance)

    }
  }
  setInitialInsuranceValues(insuranceData: any[]) {
    const insuranceFormArray = this.patientForm.get('insurance') as FormArray;
    insuranceData.forEach((insurance) => {
      insuranceFormArray.push(this.formBuilder.group({
        pat_ins_id: [insurance.pat_ins_id],
        ins_id: [insurance.ins_id, Validators.required],
        ins_card_no: [insurance.ins_card_no],
        valid_from: [insurance.valid_from],
        valid_upto: [insurance.valid_upto],
      }));
    });
  }
  onDobChange(date: any) {
    this.calculatedAge = this.calculateAge(date)
    console.log('age = ', this.calculatedAge)
  }
  addInsurance() {
    this.insuranceControls.push(this.formBuilder.group({
      pat_ins_id: [''],
      ins_id: ['', Validators.required],
      ins_card_no: ['', Validators.required],
      valid_from: [''],
      valid_upto: ['']
    }));
  }
  removeInusrance(index: number) {
    this.insuranceControls.removeAt(index)
  }
  resetForm() {
    this.insuranceControls.clear()
    this.patientForm.reset();
    this.editData = null
    // this.patientForm.setErrors(null)
  }

  onSubmit() {
    if (this.patientForm.invalid) {
      this.snackbar.openSnackbar('error', 'fill required fields')
      return
    }
    const payload = this.patientForm.value
    Object.keys(payload).forEach(key => {
      if (payload[key] === "") payload[key] = null;
    });
    payload.insurance.forEach((val: any) => Object.keys(val).forEach(key => {
      if (val[key] === "") val[key] = null;
    }))
    console.log('reg payload', payload)
    this.apiService.postData('patient/register', payload).subscribe(
      (response: any) => {
        console.log(response)
        if (response.message.toLowerCase() == 'success') {
          this.calculatedAge = undefined
          this.resetForm()
          // this.patientForm.reset()
          // this.patientForm.markAsUntouched();
          // this.patientForm.updateValueAndValidity();
            
          // window.location.reload();
          // this.snackbar.openSnackbar('success', 'registered')
            !payload.patient_id && this.toastr.success('registered')
            payload.patient_id && this.toastr.success('updated')
        } else {
          this.snackbar.openSnackbar('error', 'failed')
        }
      },
      (error: any) => {
        console.error(error)
        this.snackbar.openSnackbar('error', 'failed')
      }
    )
  }

}
