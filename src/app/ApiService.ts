import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private baseUrl: string = 'http://localhost:8000'; 

    constructor(private http: HttpClient) { }

    fetchData(endpoint: string): any {
        const url = `${this.baseUrl}/${endpoint}`;
        console.log('get ', url)
        return this.http.get(url);
    }

    postData(endpoint: string, paylaod: any): any {
        const url = `${this.baseUrl}/${endpoint}`;
        console.log('post ', url)
        return this.http.post(url, paylaod);
    }
}
