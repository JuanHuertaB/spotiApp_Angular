import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '../../../node_modules/@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log("funciona");
  }

  getQuery(query:string){
    const URL=`https://api.spotify.com/v1/${query}`;
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAj0rwJgbCUFXNps_-uw-vL-18w--WgmhtUzyYfC6mo4g_cIgjfx7ftIazsSL7qR9uSPfHJajhLp6KzARw'
    });
    return this.http.get(URL, {headers});
  }

  getNewReleases(){
    return this.getQuery('browse/new-releases?limit=20').
                  pipe(map( data => data['albums'].items ));
    }

  getArtistas(termino:string){
    return this.getQuery(`search?q=${termino}&type=artist&limit=10`)
              .pipe(map( data => data['artists'].items ));
  }

  getArtista(id:string){
    return this.getQuery(`artists/${id}`);
              // .pipe(map( data => data['artists'].items ));
  }
  
  getTopTracks(id:string){
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
              .pipe(map( data => data['tracks'] ));
  }


}
