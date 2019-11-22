import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gleisbild } from './gleisbild.interface';

@Injectable({
  providedIn: 'root'
})
export class GleisbildService {

  private readonly _gleisbildUrl = environment.schematisierungBaseUrl + 'graphics/ssp';

  constructor(private _httpClient: HttpClient) {
  }

  public loadGleisbild(id: string): Observable<Gleisbild> {
    const endpoint = `${this._gleisbildUrl}/${id}`;
    return this._httpClient.get<Gleisbild>(endpoint);
  }
}
