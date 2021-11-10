import { ITodo } from "../types";

export default class Todo implements ITodo {
  id: number;
  text: string;
  status: boolean;

  constructor(value: string, id = Date.now(), status = false) {
    this.id = id;
    this.text = value;
    this.status = status;
  }

  static fromObject({id,text,status}: ITodo) {
    return new Todo(text, id, status)
  }
}
