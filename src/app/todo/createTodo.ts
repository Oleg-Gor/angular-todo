export default class TodoCreate {
  id: number;
  text: string;
  status: boolean;

  constructor(value) {
    this.id = Date.now();
    this.text = value;
    this.status = false;
  }
}
