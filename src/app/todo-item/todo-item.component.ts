import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo
  @Output() removeId = new EventEmitter()
  @Output() toggleTodoId = new EventEmitter()
  @Output() editTodoId = new EventEmitter()
  @ViewChild('todoFocus') todoRef: ElementRef
  edit: false
  text: ''

  constructor() {
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
      this.editTodoId.emit({ id: this.todo.id, text: this.text })
    }
  }

  removeTodo(id) {
    this.removeId.emit(id)
  }
  toggleStatusTodo(id) {
    this.toggleTodoId.emit(id)
  }
  focusTodo() {
    this.todoRef.nativeElement.focus()
  }
}
