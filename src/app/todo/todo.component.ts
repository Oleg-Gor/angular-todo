import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, DoCheck {

  todoList = []
  todoName = "test-1"

  constructor() { }

  ngOnInit(): void {
    let newTodoList;
    if (localStorage[this.todoName]) {
      newTodoList = JSON.parse(localStorage[this.todoName]);
      this.todoList = newTodoList;
    }
  }

  ngDoCheck() {
    const localStorageTodoList = JSON.stringify(this.todoList);
    localStorage.setItem(this.todoName, localStorageTodoList);

  }

  addTodo(event) {
    if (event.target.value.trim()) {
      const newTodo = {
        id: +new Date(),
        text: event.target.value,
        status: false,
      };
      event.target.value = "";
      this.todoList.push(newTodo);
    }
  }

  editTodo(event) {
    const index = this.todoList.findIndex((todo) => todo.id === event.id);
    this.todoList[index].text = event.text;
  }

  removeTodo(id) {
    const index = this.todoList.findIndex((todo) => todo.id === id);
    this.todoList.splice(index, 1);
  }

  removeCompletedTodos() {
    this.todoList = this.todoList.filter((todo) => !todo.status);
  }

  toggleStatusTodo(id) {
    const index = this.todoList.findIndex((todo) => todo.id === id);
    this.todoList[index].status = !this.todoList[index].status;
  }
  toggleStatusAllTodos() {
    const countOfUnChecked = this.todoList.filter(
      (todo) => !todo.status
    ).length;

    this.todoList = this.todoList.map((todo) => {
      countOfUnChecked > 0 ? (todo.status = true) : (todo.status = false);
      return todo;
    });
  }

  completedTodos() {
    return this.todoList.filter((todo) => todo.status).length
  }
  uncompletedTodos() {
    return this.todoList.filter((todo) => !todo.status).length
  }
}
