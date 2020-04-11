import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { ConsultantCompany } from './org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ConsultantCompanyService {

  private NAMESPACE = 'org.ifb.trustfabric.ConsultantCompany';

  constructor(private dataService: DataService<ConsultantCompany>) {
  };

  public getAll(): Observable<ConsultantCompany[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getAsset(id: any): Observable<ConsultantCompany> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addAsset(itemToAdd: any): Observable<ConsultantCompany> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<ConsultantCompany> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<ConsultantCompany> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
