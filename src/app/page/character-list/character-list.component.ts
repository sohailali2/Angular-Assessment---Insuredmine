import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../character.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.characterService.getCharacters().subscribe(data => {
      this.characters = data;
      this.filteredCharacters = data;
      this.totalPages = Math.ceil(this.filteredCharacters.length / this.itemsPerPage);
    });
  }

  filterCharacters(filters: any): void {
    this.filteredCharacters = this.characters.filter(character => {
      const matchMovie = !filters.movie || character.films.includes(filters.movie);
      const matchSpecies = !filters.species || character.species.includes(filters.species);
      const matchBirthYear = !filters.birthYear || this.isWithinBirthYearRange(character.birth_year, filters.birthYear);
      return matchMovie && matchSpecies && matchBirthYear;
    });
    this.totalPages = Math.ceil(this.filteredCharacters.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to the first page after filtering
  }

  private isWithinBirthYearRange(birthYear: string, range: { min: number, max: number }): boolean {
    if (!birthYear) return false;
    const year = parseFloat(birthYear.replace('BBY', '').replace('ABY', ''));
    return year >= range.min && year <= range.max;
  }

  getPaginatedCharacters(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCharacters.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get pageNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
