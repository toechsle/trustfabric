import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';


@Injectable({
  providedIn: 'root'
})
export class ConsultantsUpdateImageService {

  private imageUpdated = new Subject();
  imageUpdated$ = this.imageUpdated.asObservable();

  dataUpdated() {
      this.imageUpdated.next();
  }

}
