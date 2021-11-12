import Todo from 'src/app/todo/Todo'

import { Component } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { TodoItemComponent } from '../todo-item/todo-item.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoList: Todo[] = [];

  constructor(
    public todoService: TodoService,
    public router: Router
  ) {
    this.todoService.todoList.subscribe(todoList => {
      console.log('NEW TODO LIST: ', todoList)
      this.todoList = todoList;
      localStorage.setItem(this.todoService.todoName,  JSON.stringify(todoList));
    })
   }

  addTodo(event) {
    const target = event.target as HTMLInputElement
    const value: string = target.value.trim()

    if (!value) return

    this.todoService.addTodo(value);

    event.target.value = "";

  }
}
