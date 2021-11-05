import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-rout.module';
import { TodoService } from './shared/todo.service';



@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
