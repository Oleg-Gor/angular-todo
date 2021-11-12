import Todo from 'src/app/todo/Todo'

import { Injectable, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditTodo } from 'src/app/types/index'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {

  todoList: BehaviorSubject<Todo[]>;
  //filteredTodoList: Todo[] = []
  todoName = "test-1"

  constructor(private router: Router) {
    const savedData = localStorage[this.todoName];
    const savedTodos = savedData && typeof savedData === 'string' ? JSON.parse(localStorage[this.todoName]) : [];
    this.todoList = new BehaviorSubject(savedTodos);
  }

  addTodo(value) {
    const newTodo = new Todo(value);

    const newTodoList = [...this.todoList.getValue(), newTodo]

    this.todoList.next(newTodoList)

  }


  countTodos() {
    let count = 0;
    this.todoList.subscribe(todo => count = todo.length)
    return count

  }

  completedTodos() {
    // let completed = 0;

    // this.todoList.subscribe(todos => completed = todos.filter((todo) => todo.status).length)

    // return completed

  }

  uncompletedTodos() {
    let uncompleted = 0;
    this.todoList.subscribe(todos => uncompleted = todos.filter((todo) => !todo.status).length)

    // console.log('subj', uncompleted)
    // console.log('getValue', this.todoList.getValue().filter((todo) => !todo.status).length)
    return uncompleted
  }


  toggleStatusAllTodos() {
    let countOfUnChecked;
    this.todoList.subscribe(todos => countOfUnChecked = todos.filter(
      (todo) => !todo.status
    ).length)

    let newTodoList
    this.todoList.subscribe(todos => newTodoList = todos.map((todo) => {
      countOfUnChecked > 0 ? (todo.status = true) : (todo.status = false);
      return todo;
    }))

    this.todoList.next(newTodoList);

  }

  identify(index,todo) {
        return todo.id
      }


  /*
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



 */
}


