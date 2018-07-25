import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { TrackComponent } from './track/track.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';

import { SPOTIFY_PROVIDERS } from './spotify.service';

import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

const routes : Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: SearchComponent},
  { path: 'tracks/:id', component:TrackComponent},
  { path: 'artists/:id', component:ArtistComponent},
  { path: 'albums/:id', component:AlbumComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TrackComponent,
    AlbumComponent,
    ArtistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ 
      SPOTIFY_PROVIDERS, 
      {provide: APP_BASE_HREF, useValue: '/'},
      {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
