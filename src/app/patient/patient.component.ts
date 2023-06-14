import { Component } from '@angular/core';
import { ApiService } from '../ApiService';
import { ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})

export class PatientComponent {
  constructor(private apiService: ApiService) { }
  searchTerm = ''
  ngOnInit() {
    this.apiService.fetchData('insurance').subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.error(error)
      }
    )
  }
  isDrawerOpen = false;

  toggleRegisterDrawer(){
    this.isDrawerOpen = !this.isDrawerOpen
  }
  handleCancelEvent(data: any){
    console.log("this.handleCancelEvent",data)
    if(data) this.toggleRegisterDrawer()
  }
}
