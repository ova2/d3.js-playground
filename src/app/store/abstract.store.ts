import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export abstract class Store<T> {

  private _state$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
  }

  public get state(): T {
    return this._state$.getValue();
  }

  public set state(nextState: T) {
    this._state$.next(nextState);
  }

  public select<S>(selectFn: (state: T) => S): Observable<S> {
    return this._state$.pipe(
      map(selectFn),
      distinctUntilChanged()
    );
  }
}
