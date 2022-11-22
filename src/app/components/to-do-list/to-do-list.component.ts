import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ArchiveModel, ProblemModel, ToDoListService } from 'src/app/services/to-do-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  problem: ProblemModel = {
    name: '',
    isCompleted: false
  }

  list$!: BehaviorSubject<ProblemModel[]>
  archive$!: BehaviorSubject<ArchiveModel[]>

  constructor(private service: ToDoListService) {
    this.list$ = service.list$;
    this.archive$ = service.archive$;
   }

  ngOnInit(): void {
    this.service.getAll().subscribe();
    this.service.getArchive().subscribe();
  }

  Add(form: NgForm): void{
    const newProblem = form.value as ProblemModel;
    this.service.add(newProblem).subscribe(() => {      
      window.location.reload();
    })
  }

  Complete(problem: ProblemModel, id: number): void{
    problem.isCompleted = !problem.isCompleted;
    this.service.complete(problem, id).subscribe(() => {      
      window.location.reload();
    });
  }

  ToArchive(id: number): void{
    this.service.toArchive(id).subscribe(() => {      
      window.location.reload();
    });
  }

  FromArchive(id: number): void{
    this.service.fromArchive(id).subscribe(() => {      
      window.location.reload();
    });
  }
}