import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { RemoveFromConsultantsOfAcceptedProject } from '../../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RemoveFromConsultantsOfAcceptedProjectService {

  private NAMESPACE = 'org.ifb.trustfabric.RemoveFromConsultantsOfAcceptedProject';

  constructor(private dataService: DataService<RemoveFromConsultantsOfAcceptedProject>) {
  };

  public getAll(): Observable<RemoveFromConsultantsOfAcceptedProject[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<RemoveFromConsultantsOfAcceptedProject> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<RemoveFromConsultantsOfAcceptedProject> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<RemoveFromConsultantsOfAcceptedProject> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<RemoveFromConsultantsOfAcceptedProject> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

