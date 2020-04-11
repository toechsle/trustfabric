import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appEqualValidatorAdminConsultant]'
})
export class EqualValidatorAdminConsultantDirective {

  @Input('validateEqual') controlNameToCompare: string;
    
  validate(c: AbstractControl): ValidationErrors | null {

      if(c.value == null || c.value.length == 0) {
          return null;
      }
      const controlToCompare = c.root.get(this.controlNameToCompare);
      if (controlToCompare) {
          const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
              c.updateValueAndValidity();
              subscription.unsubscribe();
          });
      } 
      return controlToCompare && controlToCompare.value !== c.value ? { 'validateEqual': true } : null;

  }

}
