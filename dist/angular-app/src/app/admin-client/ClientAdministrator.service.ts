import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ClientAdministrator } from '../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ClientAdministratorService {

  private NAMESPACE = 'org.ifb.trustfabric.ClientAdministrator';

  constructor(private dataService: DataService<ClientAdministrator>) {
  };

  public getAll(): Observable<ClientAdministrator[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<ClientAdministrator> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<ClientAdministrator> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<ClientAdministrator> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<ClientAdministrator> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
