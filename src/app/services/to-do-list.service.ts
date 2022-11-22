import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface ProblemModel{
  id?: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  apiLink = "https://localhost:5001/api/ListProblem";
  list$ = new BehaviorSubject<ProblemModel[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProblemModel[]>{
    return this.http.get<ProblemModel[]>(this.apiLink)
    .pipe(tap(problem => this.list$.next(problem)));
  }
}
