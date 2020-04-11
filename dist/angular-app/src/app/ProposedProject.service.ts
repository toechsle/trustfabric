import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs/Observable';
import { ProposedProject } from './org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ProposedProjectService {

  private NAMESPACE = 'org.ifb.trustfabric.ProposedProject';

  constructor(private dataService: DataService<ProposedProject>) {
  };

  public getAll(): Observable<ProposedProject[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getAsset(id: any): Observable<ProposedProject> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addAsset(itemToAdd: any): Observable<ProposedProject> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<ProposedProject> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<ProposedProject> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
