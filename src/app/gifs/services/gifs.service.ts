import { query } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private servicioURl : string ='https:api.giphy.com/v1/gifs/search';
  private apikey :string = 'yYC6dXbjcfhGgg7xWEYSuq9D8CIZrfVQ';
  private  _historial : string []= [];
  //TODO : tipo correspondeinte
  public resultados : Gif [] = [];

  get historial(){
    return [... this._historial];
  }

  constructor(private http : HttpClient){
   /* if(localStorage.getItem('historial')){
       this._historial = JSON.parse(localStorage.getItem('historial')!); 
    }*/
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
     this.resultados = JSON.parse(localStorage.getItem('resultados')!)||[];
  }

  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query) ){
      
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    const params = new HttpParams()
                          .set('api_key',this.apikey)
                          .set('limit',10)
                          .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.servicioURl}`,{params})
        .subscribe((resp ) =>{
          console.log(resp.data)
          this.resultados = resp.data;
          localStorage.setItem('resultados',JSON.stringify(this.resultados));
        })
    //console.log(this._historial)
  }


}
