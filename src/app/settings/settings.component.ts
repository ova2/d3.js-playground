import { Component } from '@angular/core';
import { GleisbildService } from '../gleisbild/gleisbild.service';
import { Gleisbild } from '../gleisbild/gleisbild.interface';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GleisbildStore } from '../gleisbild/gleisbild.store';

@Component({
  selector: 'ssp-editor-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private _gleisbildService: GleisbildService, private _gleisbildStore: GleisbildStore) {
  }

  public loadGleisbild(id: string): void {
    if (!id || id.trim().length === 0) {
      this._gleisbildStore.saveGleisbild(undefined);
      return;
    }

    this._gleisbildService.loadGleisbild(id)
      .pipe(
        catchError(() => {
          console.warn(`Gleisbild with the Id ${id} could not be loaded`);
          return EMPTY;
        }))
      .subscribe((gleisbild: Gleisbild) => {
        this._gleisbildStore.saveGleisbild(gleisbild);
      });
  }
}
