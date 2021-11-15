import Todo from 'src/app/todo/Todo'

import { Injectable, OnChanges, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditTodo } from 'src/app/types/index'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {

  todoList: BehaviorSubject<Todo[]>;
  path: BehaviorSubject<string>;
  todoName = "test-1"

  constructor(private router: Router) {
    const savedData = localStorage[this.todoName];
    const savedTodos = savedData && typeof savedData === 'string' ? JSON.parse(localStorage[this.todoName]) : [];
    this.todoList = new BehaviorSubject(savedTodos);
    this.path = new BehaviorSubject(this.router.url)
  }

  addTodo(value):void {
    const newTodo = new Todo(value);
    const newTodoList = [...this.todoList.getValue(), newTodo]
    this.todoList.next(newTodoList)
  }

  countTodos():number {
    return this.todoList.getValue().length
  }

  completedTodos():number {
    return this.todoList.getValue().filter(todo => todo.status).length
  }

  uncompletedTodos():number {
    return this.todoList.getValue().filter(todo => !todo.status).length
  }

  toggleStatusAllTodos():void {
    const countOfUnChecked = this.todoList.getValue().filter((todo) => !todo.status).length
    const newTodoList = this.todoList.getValue().map((todo) => {
      countOfUnChecked > 0 ? (todo.status = true) : (todo.status = false);
      return todo;
    })
    this.todoList.next(newTodoList);
  }

  toggleStatusTodo(id: number):void {
    const index = this.todoList.getValue().findIndex((todo) => todo.id === id);
    this.todoList.getValue()[index].status = !this.todoList.getValue()[index].status;
    this.todoList.next(this.todoList.getValue())
  }

  removeCompletedTodos(): void {
    const newTodoList = this.todoList.getValue().filter((todo) => !todo.status);
    this.todoList.next(newTodoList);
  }

  removeTodo(id: number): void {
    const newTodoList = this.todoList.getValue().filter(todo => todo.id !== id)
    this.todoList.next(newTodoList)
  }

  editTodo(event: EditTodo): void {
    const index = this.todoList.getValue().findIndex((todo) => todo.id === event.id);
    this.todoList.getValue()[index].text = event.text;
  }

  changePath():void {
    this.path.next(this.router.url)
  }

  goToPostsPage(path):Todo[] {
    switch (path) {
      case "/active":
        return this.todoList.getValue().filter((todo) => !todo.status);
      case "/completed":
        return this.todoList.getValue().filter((todo) => todo.status);
      default:
        return this.todoList.getValue();
    }
  }

}


