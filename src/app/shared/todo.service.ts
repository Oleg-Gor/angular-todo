import { Injectable, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo, EditTodo } from 'src/app/types/index'
import TodoCreate from '../todo/createTodo';

@Injectable({ providedIn: 'root' })
export class TodoService {

  todoList: Todo[] = []
  filteredTodoList: Todo[] = []
  todoName = "test-1"

  constructor(private router: Router) { }
  addTodo(event) {
    const target = event.target as HTMLInputElement
    const value:string = target.value.trim()

    if (!value) return
    this.todoList.push(new TodoCreate(value));
    event.target.value = "";

  }

  editTodo(event: EditTodo) {
    const index = this.todoList.findIndex((todo) => todo.id === event.id);
    this.todoList[index].text = event.text;
  }

  removeTodo(id: number) {
    const index = this.todoList.findIndex((todo) => todo.id === id);
    this.todoList.splice(index, 1);
  }

  removeCompletedTodos() {
    this.todoList = this.todoList.filter((todo) => !todo.status);
  }

  toggleStatusTodo(id: number) {
    const index = this.todoList.findIndex((todo) => todo.id === id);
    this.todoList[index].status = !this.todoList[index].status;
  }
  toggleStatusAllTodos(): void {
    const countOfUnChecked = this.todoList.filter(
      (todo) => !todo.status
    ).length;

    this.todoList = this.todoList.map((todo) => {
      countOfUnChecked > 0 ? (todo.status = true) : (todo.status = false);
      return todo;
    });
  }

  goToPostsPage(): void {
    const path = this.router.url

    switch (path) {
      case "/active":
        this.filteredTodoList = this.todoList.filter(
          (todo) => !todo.status
        );
        break;
      case "/completed":
        this.filteredTodoList = this.todoList.filter((todo) => todo.status);
        break;
      default:
        this.filteredTodoList = this.todoList;
    }
  }

  completedTodos(): number {
    return this.todoList.filter((todo) => todo.status).length
  }
  uncompletedTodos(): number {
    return this.todoList.filter((todo) => !todo.status).length
  }
}


