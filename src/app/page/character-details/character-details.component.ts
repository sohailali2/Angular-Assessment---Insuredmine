import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../character.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  character: any;
  speciesNames: string[] = [];
  movieTitles: string[] = [];
  starshipNames: string[] = [];
  vehicleNames: string[] = [];
  planetName: string = '';

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.characterService.getCharacter(Number(id)).pipe(
      switchMap(character => {
        this.character = character;
        return forkJoin([
          ...character.species.map((url: string) => this.characterService.getDataByUrl(url)),
          ...character.films.map((url: string) => this.characterService.getDataByUrl(url)),
          ...character.starships.map((url: string) => this.characterService.getDataByUrl(url)),
          ...character.vehicles.map((url: string) => this.characterService.getDataByUrl(url)),
          this.characterService.getDataByUrl(character.homeworld)
        ]);
      })
    ).subscribe(results => {
      this.speciesNames = results.slice(0, this.character.species.length).map((res: any) => res.name);
      this.movieTitles = results.slice(this.character.species.length, this.character.species.length + this.character.films.length).map((res: any) => res.title);
      this.starshipNames = results.slice(this.character.species.length + this.character.films.length, this.character.species.length + this.character.films.length + this.character.starships.length).map((res: any) => res.name);
      this.vehicleNames = results.slice(this.character.species.length + this.character.films.length + this.character.starships.length, this.character.species.length + this.character.films.length + this.character.starships.length + this.character.vehicles.length).map((res: any) => res.name);
      this.planetName = results[results.length - 1].name;
    });
  }
}
