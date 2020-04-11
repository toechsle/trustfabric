import { Injectable } from '@angular/core';
import { DataService } from '../../data.service';
import { Observable } from 'rxjs/Observable';
import { AcceptedProject } from '../../org.ifb.trustfabric';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AcceptedProjectService {

  private NAMESPACE = 'org.ifb.trustfabric.AcceptedProject';

  constructor(private dataService: DataService<AcceptedProject>) {
  };

  public getAll(): Observable<AcceptedProject[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getAsset(id: any): Observable<AcceptedProject> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addAsset(itemToAdd: any): Observable<AcceptedProject> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<AcceptedProject> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<AcceptedProject> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
