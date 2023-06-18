import { Component } from '@angular/core';
import { ApiService } from '../../ApiService'
import {SnackBarService} from '../../services/snack-bar.service'

@Component({
  selector: 'app-insurance-register',
  templateUrl: './insurance-register.component.html',
  styleUrls: ['./insurance-register.component.css']
})
export class InsuranceRegisterComponent {
  constructor(private apiService: ApiService, private snackbar: SnackBarService) { }
  companyName?: string
  postData() {
    this.apiService.postData('insurance/register', { company_name: this.companyName }).subscribe(
      (response: any) => {
        console.log(response)
        if (response.message == 'success') {
          this.snackbar.openSnackbar('success','register success')
        }
      },
      (error:any)=>{
        console.log('err',error)
      }
    )
  }
}
