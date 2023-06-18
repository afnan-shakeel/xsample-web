import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../ApiService';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.css']
})
export class AddInsuranceComponent {

  constructor(public dialog: MatDialogRef<AddInsuranceComponent>, private apiService: ApiService) { }

  formData: any = {}
  insCompanies: any[] = []
  ngOnInit(){
    this.apiService.fetchData('insurance').subscribe(
      (response:any)=>{
        if(response.message != 'success') {
          console.log('failed to fetch',response.data)
        }
        this.insCompanies = response.data
      }
    )
  }
  closeDialog(): void {
    this.dialog.close()
  }
}
