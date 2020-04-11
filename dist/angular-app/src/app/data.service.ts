import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DataService<Type> {

    private actionUrl: string;

    constructor(private httpClient: HttpClient) {
        this.actionUrl = '/api/';
    }

    public getAll(ns: string): Observable<Type[]> {
        console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);
        return this.httpClient.get<Type[]>(`${this.actionUrl}${ns}`, {withCredentials: true});
    }

    public getSingle(ns: string, id: string): Observable<Type> {
        console.log('GetSingle ' + ns);

        return this.httpClient.get<Type>(this.actionUrl + ns + '/' + id, {withCredentials: true});
    }

    public add(ns: string, asset: Type): Observable<Type> {
        console.log('Entered DataService add');
        console.log('Add ' + ns);
        console.log('asset', asset);

        return this.httpClient.post<Type>(this.actionUrl + ns, asset, {withCredentials: true});
    }

    public update(ns: string, id: string, itemToUpdate: Type): Observable<Type> {
        console.log('Update ' + ns);
        console.log('what is the id?', id);
        console.log('what is the updated item?', itemToUpdate);
        console.log('what is the updated item?', JSON.stringify(itemToUpdate));
        return this.httpClient.put<Type>(`${this.actionUrl}${ns}/${id}`, itemToUpdate, {withCredentials: true});
    }

    public delete(ns: string, id: string): Observable<Type> {
        console.log('Delete ' + ns);

        return this.httpClient.delete<Type>(this.actionUrl + ns + '/' + id, {withCredentials: true});
    }


}

