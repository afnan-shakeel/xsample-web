import { Component, EventEmitter } from '@angular/core';
import { ApiService } from '../../ApiService';
import { ObservableLike } from 'rxjs';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent {
  constructor(private apiService: ApiService) { }
  sample_data : any[] = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 }
  ];
  displayedColumns: string[] = ['id', 'name', 'price'];
  searchTerm: string = '';
  suggestions: any[] = []
  allSuggestions: any[] = []
  ngOnInit() {
    this.apiService.fetchData('patient').subscribe(
      (response)=>{
        console.log(response.data)
        this.allSuggestions = response.data
        
      },
      (error)=>{
        console.error(error)
      }
    )
  }
  onInputChange() {
    console.log('searching')
    this.generateSuggestions()
  }
  generateSuggestions() {
    this.suggestions = []
    if (this.searchTerm == '') {
      this.suggestions = []
      return
    }
    // this.suggestions = this.allSuggestions.filter(suggestion => suggestion.toLowerCase().includes(this.searchTerm.toLowerCase()))
    for (const item of this.allSuggestions){
      console.log('sad',item)
      if(item.civil_id.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           item.patient_id.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
           item.mobile_no.toString().toLowerCase().includes(this.searchTerm.toLowerCase())){

        this.suggestions.push(item)
      }
    }
  }
}
