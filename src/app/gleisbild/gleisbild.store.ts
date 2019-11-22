import { Injectable } from '@angular/core';
import { Store } from '../store/abstract.store';
import { Gleisbild } from './gleisbild.interface';

@Injectable({
  providedIn: 'root'
})
export class GleisbildStore extends Store<Gleisbild> {

  constructor() {
    super(undefined);
  }

  public saveGleisbild(gleisbild: Gleisbild): void {
    this.state = {...gleisbild};
  }
}
