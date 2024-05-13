import { Observable } from 'rxjs';
type MapResponseObserver<T, E, R1, R2> = {
    next: (value: T) => R1;
    error: (error: E) => R2;
};
export declare function mapResponse<T, E, R1, R2>(observer: MapResponseObserver<T, E, R1, R2>): (source$: Observable<T>) => Observable<R1 | R2>;
export {};
