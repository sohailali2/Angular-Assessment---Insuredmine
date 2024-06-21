import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CharacterService } from '../../character.service';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.css']
})
export class CharacterFilterComponent implements OnInit {
  movies: any[] = [];
  species: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  birthYears: string[] = ['All', 'BBY10', 'BBY20', 'BBY30', 'ABY5']; // Example birth years
  filters: any = { movie: '', species: '', vehicle: '', starship: '', birthYear: '' };

  @Output() filtersChanged = new EventEmitter<any>();

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characterService.getMovies().subscribe(data => this.movies = data);
    this.characterService.getSpecies().subscribe(data => this.species = data);
    this.characterService.getVehicles().subscribe(data => this.vehicles = data);
    this.characterService.getStarships().subscribe(data => this.starships = data);
  }

  onFiltersChange(): void {
    this.filtersChanged.emit(this.filters);
  }
}
