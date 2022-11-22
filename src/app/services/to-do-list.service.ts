import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface ProblemModel{
  id?: number,
  name: string
  isCompleted: boolean
}

export interface ArchiveModel{
  id?: number,
  name: string
  isCompleted: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  apiListLink = "https://localhost:5001/api/ListProblem";
  apiArchiveLink = "https://localhost:5001/api/Archive";

  list$ = new BehaviorSubject<ProblemModel[]>([]);
  archive$ = new BehaviorSubject<ArchiveModel[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProblemModel[]>{
    return this.http.get<ProblemModel[]>(this.apiListLink)
    .pipe(tap(problem => this.list$.next(problem)));
  }

  getArchive(): Observable<ArchiveModel[]>{
    return this.http.get<ArchiveModel[]>(this.apiArchiveLink)
    .pipe(tap(archive => this.archive$.next(archive)));
  }

  add(model: ProblemModel): Observable<ProblemModel>{
    return this.http.post<ProblemModel>(this.apiListLink, model);
  }

  complete(model: ProblemModel, id: number): Observable<{}>{
    return this.http.put<{}>(`${this.apiListLink}?id=${id}`, model);
  }

  toArchive(id: number): Observable<{}>{
    return this.http.delete<{}>(`${this.apiListLink}?id=${id}`);
  }

  fromArchive(id: number): Observable<{}>{
    return this.http.delete<{}>(`${this.apiArchiveLink}?id=${id}`);
  }
}
