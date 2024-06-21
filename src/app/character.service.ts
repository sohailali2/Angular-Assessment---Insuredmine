import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private baseUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/people`).pipe(
      map(response => response.results)
    );
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/people/${id}`);
  }

  getMovies(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/films`).pipe(
      map(response => response.results)
    );
  }

  getSpecies(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/species`).pipe(
      map(response => response.results)
    );
  }

  getVehicles(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/vehicles`).pipe(
      map(response => response.results)
    );
  }

  getStarships(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/starships`).pipe(
      map(response => response.results)
    );
  }

  getDataByUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
