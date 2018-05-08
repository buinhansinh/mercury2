import { Observable } from 'rxjs/Observable';

export interface SearchService<T> {
    search(terms: String): Observable<T[]>;
}
