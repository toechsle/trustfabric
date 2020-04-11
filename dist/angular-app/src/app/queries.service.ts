import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class QueriesService {
    
    private actionUrl: string;

    constructor(private httpClient: HttpClient) {
        this.actionUrl = '/api/queries/';
    }

    
    public sendQuery(queryName: string, parameters?: string[], parameterValues?: string[]): Observable<any[]> {
        
        console.log('Send query ' + queryName + ' to ' + this.actionUrl + queryName);
        let requestURL = this.actionUrl + queryName;
        
        if (parameters) {
            
            requestURL += '?' + parameters[0] + '=' + parameterValues[0];
            for (let i=1; i<parameters.length; i++) {
                requestURL += '&' + parameters[i] + '=' + parameterValues[i];
            }

        }
        
        return this.httpClient.get<any[]>(requestURL, {withCredentials: true});

    }


}