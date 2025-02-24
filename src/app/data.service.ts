import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  url = 'data.json';

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {}

  getJsonData() {
    return this.httpClient.get<Data>(this.url);
  }
}
