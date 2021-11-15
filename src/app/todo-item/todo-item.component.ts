import Todo from 'src/app/todo/Todo'

import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo
  @ViewChild('todoFocus') todoRef: ElementRef
  edit: boolean = false
  text: string = ''

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  removeTodo(id: number):void {
    this.todoService.removeTodo(id);
  }

  toggleStatusTodo(id:number):void {
    this.todoService.toggleStatusTodo(id);
  }

  createEditInput(status: boolean):void {
    this.edit = status;
    if (status) {
      this.text = this.todo.text
    }
  }

  editTodo(status: boolean, event: KeyboardEvent):void {
    if (event.type === "keyup" && event.code === "Escape") {
      this.createEditInput(status);
    } else if (this.edit) {
      this.createEditInput(status);
      this.todoService.editTodo({ id: this.todo.id, text: this.text })
    }
  }

  focusTodo():void {
    this.todoRef.nativeElement.focus()
  }
}
