import Todo from 'src/app/todo/Todo'

import { Component } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent  {

  constructor(public todoService: TodoService,
    public router: Router
    ) {}

  ngOnInit(): void {
    if (!localStorage[this.todoService.todoName]) return;
    const restoredTodos = JSON.parse(localStorage[this.todoService.todoName]);
    if (!Array.isArray(restoredTodos)) return
    this.todoService.todoList = restoredTodos.map((t) => Todo.fromObject(t));
    this.todoService.filteredTodoList = this.todoService.todoList
  }

  ngDoCheck() {
    const localStorageTodoList = JSON.stringify(this.todoService.todoList);
    localStorage.setItem(this.todoService.todoName, localStorageTodoList);

    this.todoService.goToPostsPage()
  }
}
