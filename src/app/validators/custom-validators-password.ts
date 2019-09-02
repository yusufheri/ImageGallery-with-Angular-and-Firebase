import { FormControl, FormGroup, NgForm, FormGroupDirective } from '@angular/forms';

export class CustomValidatorsPassword {

    static passwordMatchValidator(formGroup: FormGroup) {
        let valid = true;
        const password = formGroup.value['password'];
        const confirm = formGroup.value['confirm'];

        if ((password === confirm)) {
            valid = true;
            console.log('Quoi');
        } else {
            console.log(password + ':' + confirm);
            formGroup.controls['confirm'].setErrors({ NoPassswordMatch: true });
            valid = false;
        }

        if (valid) { return null; }

        return { passwordMatchValidator: true };
    }

/*
    static areEqual(formGroup: FormGroup) {
        let value;
        let valid = true;
        for (let key in formGroup.controls) {
          if (formGroup.controls.hasOwnProperty(key)) {
            let control: FormControl = <FormControl>formGroup.controls[key];

            if (value === undefined) {
              value = control.value
            } else {
              if (value !== control.value) {
                valid = false;
                break;
              }
            }
          }
        }

        if (valid) {
          return null;
        }

        return {
          areEqual: true
        };
      }
 */

}
