// src/concat_latest_from.mjs
import { of } from "rxjs";
import { concatMap, withLatestFrom } from "rxjs/operators";
function concatLatestFrom(observablesFactory) {
  return concatMap((value) => {
    const observables = observablesFactory(value);
    const observablesAsArray = Array.isArray(observables) ? observables : [observables];
    return of(value).pipe(withLatestFrom(...observablesAsArray));
  });
}

// src/map-response.mjs
import { of as of2 } from "rxjs";
import { catchError, map } from "rxjs/operators";
function mapResponse(observer) {
  return (source$) => source$.pipe(map((value) => observer.next(value)), catchError((error) => of2(observer.error(error))));
}

// src/tap-response.mjs
import { EMPTY } from "rxjs";
import { catchError as catchError2, finalize, tap } from "rxjs/operators";
function tapResponse(observerOrNext, error, complete) {
  const observer = typeof observerOrNext === "function" ? {
    next: observerOrNext,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    error,
    complete
  } : observerOrNext;
  return (source) => source.pipe(tap({ next: observer.next, complete: observer.complete }), catchError2((error2) => {
    observer.error(error2);
    return EMPTY;
  }), observer.finalize ? finalize(observer.finalize) : (source$) => source$);
}
export {
  concatLatestFrom,
  mapResponse,
  tapResponse
};
//# sourceMappingURL=ngrx-operators.mjs.map
