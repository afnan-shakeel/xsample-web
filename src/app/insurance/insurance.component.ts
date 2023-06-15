import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

import { Component } from '@angular/core';
import {ApiService} from '../ApiService'
@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  // standalone: true,
  // imports:[MatTableModule, MatIconModule],
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent {
constructor(private apiService: ApiService){}

insuranceData: any[]=[]
ngOnInit(){
  this.apiService.fetchData('insurance').subscribe(
    (response)=>{
      if(response.message!='success'){

      }
      this.insuranceData = response.data      
    },
    (error)=>{
      console.log(error)
    }
  )
}
}
