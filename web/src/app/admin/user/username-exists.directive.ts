import { Directive, Input } from '@angular/core';
import { UserService } from './user.service';
import { AsyncValidator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Directive({
    selector: '[appUsernameExists]',
    providers: [{ provide: NG_VALIDATORS, useExisting: UsernameExistsDirective, multi: true }]
})
export class UsernameExistsDirective implements AsyncValidator {

    @Input('appUsernameExists') oldUsername: string;

    constructor(private userService: UserService) { }

    validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        // console.log('validating' + this.oldUsername);
        return this.userService.getByName(c.value).map(user => {
            console.log(user.name);
            return user && (user.name !== this.oldUsername) ? null : null;
        });
    }
}
