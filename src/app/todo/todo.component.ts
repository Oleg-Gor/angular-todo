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
    ) {
  }


  ngOnInit(): void {

    let newTodoList;
    if (localStorage[this.todoService.todoName]) {
      newTodoList = JSON.parse(localStorage[this.todoService.todoName]);
      this.todoService.todoList = newTodoList;
      this.todoService.filteredTodoList = this.todoService.todoList
    }
  }

  ngDoCheck() {
    const localStorageTodoList = JSON.stringify(this.todoService.todoList);
    localStorage.setItem(this.todoService.todoName, localStorageTodoList);

    this.todoService.goToPostsPage()
  }





}
