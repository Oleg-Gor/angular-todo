import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoList = [
    { "id": 1635867015981, "text": "48", "status": false },
    { "id": 1635940637787, "text": "sdf", "status": false },
    { "id": 1635940639211, "text": "sddddd", "status": false },
    { "id": 1635940640299, "text": "gdsgs", "status": true },
    { "id": 1635940641259, "text": "ddd", "status": false }
  ]

  constructor() { }

  ngOnInit(): void {
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
