import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { ClientCompany } from './org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ClientCompanyService {

  private NAMESPACE = 'org.ifb.trustfabric.ClientCompany';

  constructor(private dataService: DataService<ClientCompany>) {
  };

  public getAll(): Observable<ClientCompany[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getAsset(id: any): Observable<ClientCompany> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addAsset(itemToAdd: any): Observable<ClientCompany> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<ClientCompany> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<ClientCompany> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
