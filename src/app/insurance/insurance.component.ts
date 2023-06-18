import { Component, OnInit } from '@angular/core';
import { ApiService } from '../ApiService'
@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit{
  constructor(public apiService: ApiService) { }
  isDrawerOpen: boolean = false;
  insuranceData: any[] = []
  ngOnInit() {
    this.apiService.fetchData('insurance').subscribe(
      (response: any) => {
        if (response.message != 'success') {

        }
        this.insuranceData = response.data
      },
      (error:any) => {
        console.log(error)
      }
    )
  }
  toggleDrawer(){
    this.isDrawerOpen = !this.isDrawerOpen
  }
}
