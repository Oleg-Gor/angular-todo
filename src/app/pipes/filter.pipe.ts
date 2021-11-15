import { Pipe, PipeTransform } from '@angular/core';
import Todo from '../todo/Todo';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(todoList: Todo[], path: string): Todo[] {
    switch (path) {
      case "/active":
        return todoList.filter((todo) => !todo.status);
      case "/completed":
        return todoList.filter((todo) => todo.status);
      default:
        return todoList;
    }
  }
}
