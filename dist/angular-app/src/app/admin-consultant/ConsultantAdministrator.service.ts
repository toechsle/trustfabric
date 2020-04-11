import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ConsultantAdministrator } from '../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ConsultantAdministratorService {

  private NAMESPACE = 'org.ifb.trustfabric.ConsultantAdministrator';

  constructor(private dataService: DataService<ConsultantAdministrator>) {
  };

  public getAll(): Observable<ConsultantAdministrator[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<ConsultantAdministrator> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<ConsultantAdministrator> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<ConsultantAdministrator> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<ConsultantAdministrator> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
