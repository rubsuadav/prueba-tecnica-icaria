import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// local imports
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  protected movies: any[] = [];
  protected searchItem: string = '';

  protected actualPage: number = 0;
  protected totalPages: number = 0;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.loadPage(0);
  }

  protected loadPage(page: number): void {
    if (this.searchItem.trim()) {
      this.searchMovies(page);
    } else {
      this.getMoviesPaginated(page);
    }
  }

  protected getMoviesPaginated(page: number): void {
    this.movieService.getMovies(page).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
        this.actualPage = page;
      },
      error: (error: any) => {
        alert('Error fetching movies: ' + error);
      },
    });
  }

  protected searchMovies(page: number): void {
    this.movieService.searchMovies(this.searchItem, page).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.totalPages = response.total_pages;
        this.actualPage = page;
      },
      error: (error: any) => {
        alert('Error searching movies: ' + error);
      },
    });
  }
}
