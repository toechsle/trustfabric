import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class ConsultantSelectedService {

  consultantSelected = new BehaviorSubject<string>("startValue");
  consultantSelected$ = this.consultantSelected.asObservable();

  sendMessage(id: string ) {
      this.consultantSelected.next(id);
  }

}
