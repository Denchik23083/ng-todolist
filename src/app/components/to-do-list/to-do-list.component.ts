import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProblemModel, ToDoListService } from 'src/app/services/to-do-list.service';

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

  constructor(private service: ToDoListService, private router: Router) {
    this.list$ = service.list$;
   }

  ngOnInit(): void {
    this.service.getAll().subscribe();
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
    })
  }
}