import { Injectable } from '@angular/core';
import { TreeElement } from '../interfaces/tree-element';
import { HttpClient } from '@angular/common/http';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MocksService {

  constructor(private http: HttpClient) { }

  getReptiliesTree() : Observable<TreeElement []> {
    return this.http.get('assets/data/reptilies.json').pipe(take(1), map((data) => {
      return data as TreeElement [];
    }))
  }
}
