import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoLoadingService } from 'src/app/services/todo-loading.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent {
  public selectedUser = [];

  constructor(
    public readonly todoLoadingService: TodoLoadingService,
  ) {}



}
