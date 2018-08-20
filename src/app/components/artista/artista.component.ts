import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent implements OnInit {

  artistId: string;
  artista:any = {};
  tracks:any[] = [];
  loading:boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private spotify:SpotifyService) {
    this.loading = true;                
    this.activatedRoute.params
        .subscribe(param => {
          this.artistId = param['id'];
          this.getArtista(param['id']);
          this.getTopTracks(param['id']);
        })      
   }

  ngOnInit() {
  }

  getArtista(id:string){
      this.spotify.getArtista(id)
        .subscribe((data:any) =>{
          this.artista = data;
          this.loading=false;
        })
  }

  getTopTracks(id:string){
      this.spotify.getTopTracks(id)
            .subscribe((data:any) =>{
              console.log(data)
              this.tracks = data;
            })
  }
}
