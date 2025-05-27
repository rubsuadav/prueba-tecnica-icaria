import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private API_URL: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  public getMovies(page: number): Observable<any> {
    return this.http.get(
      `${this.API_URL}/movie/now_playing?language=es-ES&page=${page + 1}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.NG_APP_TMDB_API_KEY}`,
        },
      }
    );
  }

  public searchMovies(query: string, page: number): Observable<any> {
    return this.http.get(
      `${this.API_URL}/search/movie?language=es-ES&query=${query}&page=${
        page + 1
      }`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.NG_APP_TMDB_API_KEY}`,
        },
      }
    );
  }
}
