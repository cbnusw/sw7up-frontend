import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
  static confirmPassword(passwordField: string = 'password',
                         confirmField: string = 'confirmPassword'): ValidatorFn {

    function validator(control: AbstractControl): ValidationErrors | null {
      const password = (control.get(passwordField).value || '').trim();
      const confirmPassword = (control.get(confirmField).value || '').trim();

      if (!confirmPassword) {
        return { requiredConfirmPassword: true };
      } else if (password !== confirmPassword) {
        return { confirmPassword: true };
      }
      return null;
    }

    return validator;
  }

  static validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    if (!/[a-zA-Z]/.test(value)) {
      return { pattern: true };
    } else if (!/\d/.test(value)) {
      return { pattern: true };
    } else if (/\s/.test(value)) {
      return { pattern: true };
    } else if (!/^[a-zA-Z\d]/.test(value)) {
      return { pattern: true };
    }

    return null;
  }
}
