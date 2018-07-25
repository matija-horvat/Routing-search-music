import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  query: string;
  results: Object;

  constructor(private spotify: SpotifyService, private router: Router, private route: ActivatedRoute) {
    
    //route.params match parameters in the route
    //route.queryParams match parameters in the query string

    this.route.queryParams.subscribe(params => { this.query = params['query'] || ''; })
   }

  ngOnInit() {
    //we want to be able to jump straight into the results if the URL includes a search query
    this.search();
  }

  search(): void {
    console.log('this.query', this.query);

    if (!this.query) {
      return;
    }

    this.spotify.searchTrack(this.query).subscribe((res : any) => this.renderResults(res));
  }

  renderResults(res : any): void{
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items;
    }
  }

  submit(query: string){

    //We’re manually telling the router to navigate to the search route, and providing a query parameter,
    //then performing the actual search

    this.router.navigate(['search'], {queryParams: {query: query}})
    .then(_ => this.search());
  }
}
