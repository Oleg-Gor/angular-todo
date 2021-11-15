import Todo from 'src/app/todo/Todo'

import { Component, DoCheck } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements DoCheck {
  todoList: Todo[] = [];
  filteredTodoList: Todo[] = [];
  countTodos: number = 0;
  completedTodos: number = 0;
  uncompletedTodos: number = 0;
  path: string = '/'

  constructor(
    public todoService: TodoService,
    public router: Router
  ) {
    this.todoService.todoList.subscribe(todoList => {
      this.todoList = todoList;
      localStorage.setItem(this.todoService.todoName, JSON.stringify(todoList));

      this.countTodos = this.todoService.countTodos()
      this.completedTodos = this.todoService.completedTodos()
      this.uncompletedTodos = this.todoService.uncompletedTodos()
    })
  }

  ngDoCheck(){
    this.path = this.todoService.changePath()
  }

  addTodo(event):void {
    const target = event.target as HTMLInputElement
    const value: string = target.value.trim()
    if (!value) return
    this.todoService.addTodo(value);
    event.target.value = "";
  }

  toggleStatusAllTodos():void {
    this.todoService.toggleStatusAllTodos()
  }

  removeCompletedTodos():void {
    this.todoService.removeCompletedTodos();
  }

  identify(index:number, todo):number {
    return todo.id
  }

}
