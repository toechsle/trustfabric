import { Directive, forwardRef, Attribute, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[validateEqual]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualValidatorConsultantDirective, multi: true }]
})
export class EqualValidatorConsultantDirective implements Validator {
    
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
