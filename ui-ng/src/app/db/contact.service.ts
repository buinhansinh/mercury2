import {
    Injectable
} from '@angular/core';
import {
    Observable
    , of
} from 'rxjs';
import { clone } from '../app-common/util';
import { SearchService } from './search.service';
import { CONTACTS } from './contact.mock';
import { Contact } from './contact.model';


@Injectable()
export class ContactService implements SearchService<Contact> {

    private CONTACTS: Contact[] = CONTACTS;

    contact: Contact;

    constructor() { }

    getById(id: string): Observable<Contact> {
        return of(CONTACTS.find(p => p.id === id));
    }

    private match(offer: Contact, term: string): boolean {
        const lterm = term.toLowerCase();
        return lterm.length < 2 ?
            offer.name.toLowerCase().indexOf(lterm) === 0 :
            offer.name.toLowerCase().indexOf(lterm) >= 0;
    }

    search(terms: string): Observable<Contact[]> {
        console.log(terms);
        if (terms.trim().length < 1) {
            return of([]);
        }
        const results: Contact[] = this.CONTACTS.filter(offer =>
            terms.split(' ').every((term: string): boolean =>
                this.match(offer, term)));
        return of(results.length > 0 ? clone(results) : null);
    }
}
