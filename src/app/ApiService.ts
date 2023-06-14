import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private baseUrl: string = 'http://localhost:8000'; // Replace with your base URL

    constructor(private http: HttpClient) { }

    fetchData(endpoint: string): Observable<any> {
        const url = `${this.baseUrl}/${endpoint}`; // Construct the API endpoint URL
        console.log('get ', url)
        return this.http.get(url);
    }

    submitData(endpoint: string, paylaod: any): any {
        const url = `${this.baseUrl}/${endpoint}`;
        console.log('post ', url)
        return this.http.post(url, paylaod);
    }
}
