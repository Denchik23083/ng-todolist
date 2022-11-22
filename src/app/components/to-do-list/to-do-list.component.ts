import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProblemModel, ToDoListService } from 'src/app/services/to-do-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  list$!: BehaviorSubject<ProblemModel[]>

  constructor(private service: ToDoListService, private router: Router) {
    this.list$ = service.list$;
   }

  ngOnInit(): void {
    this.service.getAll().subscribe();
  }

}
