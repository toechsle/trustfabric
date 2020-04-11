import { Injectable } from '@angular/core';
import { DataService } from '../../../../data.service';
import { Observable } from 'rxjs/Observable';
import { RemoveFromConsultantsOfProposedProject } from '../../../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RemoveFromConsultantsOfProposedProjectService {

  private NAMESPACE = 'org.ifb.trustfabric.RemoveFromConsultantsOfProposedProject';

  constructor(private dataService: DataService<RemoveFromConsultantsOfProposedProject>) {
  };

  public getAll(): Observable<RemoveFromConsultantsOfProposedProject[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<RemoveFromConsultantsOfProposedProject> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<RemoveFromConsultantsOfProposedProject> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<RemoveFromConsultantsOfProposedProject> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<RemoveFromConsultantsOfProposedProject> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

