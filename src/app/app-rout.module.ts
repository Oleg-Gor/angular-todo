import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoComponent } from "./todo/todo.component";

const routes: Routes =[
  {path: '', component: TodoComponent },
  {path: ':id', component: TodoComponent },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}
