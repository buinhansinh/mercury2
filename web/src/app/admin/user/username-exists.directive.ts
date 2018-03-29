import { Directive, Input } from '@angular/core';
import { UserService } from './user.service';
import { Validator, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';

@Directive({
    selector: '[appUsernameExists]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UsernameExistsDirective, multi: true }]
})
export class UsernameExistsDirective implements AsyncValidator {

    @Input('appUsernameExists') appUsernameExists: string;

    constructor(private userService: UserService) { }

    validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.userService.getByName(c.value).map(user => {
            return user && (user.name !== this.appUsernameExists) ? { 'usernameExists': 'username already exists' } : null;
        });
    }
}
