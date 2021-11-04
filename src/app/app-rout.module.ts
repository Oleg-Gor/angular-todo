import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoItemComponent } from "./todo-item/todo-item.component";
import { TodoComponent } from "./todo/todo.component";

const routes: Routes =[
  {path: ':id', component: TodoComponent },
  {path: '', component: TodoComponent },
/*   {path: 'completed', component: TodoComponent } */
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}
