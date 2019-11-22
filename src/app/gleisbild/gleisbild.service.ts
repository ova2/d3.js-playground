import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gleisbild } from './gleisbild.interface';

@Injectable({
  providedIn: 'root'
})
export class GleisbildService {

  constructor(private _httpClient: HttpClient) {
  }

  public loadGleisbild(id: string): Observable<Gleisbild> {
    let endpoint;
	if (id === 'Luzern') {
		endpoint = "https://gist.githubusercontent.com/ova2/a14ab13bdb141d8cad0c5a62f29111ca/raw/6fd09330ffc237d92cee0f788353bf32cd55e07a/ssp-layout-luzern.json";
	} else {
		endpoint = "https://gist.githubusercontent.com/ova2/e4f029ca0ec31c457995286a64ac4773/raw/8dce1ecba8fdae09c086516942111bd1bb32f46b/ssp-layout-chasseral.json";
	}
	
    return this._httpClient.get<Gleisbild>(endpoint);
  }
}
