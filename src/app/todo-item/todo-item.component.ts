import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo
  @ViewChild('todoFocus') todoRef: ElementRef
  edit: false
  text: ''

  constructor(public todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  createEditInput(status) {
    this.edit = status;
    if (status) {
      this.text = this.todo.text
    }
  }

  editTodo(status, event) {
    if (event.type === "keyup" && event.code === "Escape") {
      this.createEditInput(status);
    } else if (this.edit) {
      this.createEditInput(status);
      this.todoService.editTodo({ id: this.todo.id, text: this.text })
    }
  }

  focusTodo() {
    this.todoRef.nativeElement.focus()
  }
}
