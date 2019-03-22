import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ITodoItem } from '../models/ITodoItem';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todoItem: ITodoItem;
  @Output() doneChanged = new EventEmitter<ITodoItem>();
  @Output() deleteClicked = new EventEmitter<number>();
  @Output() editClicked = new EventEmitter<ITodoItem>();

  constructor() { }

  ngOnInit() {
  }

  toggleDone() {
    this.todoItem.done = !this.todoItem.done;
    this.doneChanged.emit(this.todoItem);
  }

  delete() {
    this.deleteClicked.emit(this.todoItem.id);
  }

  edit() {
    this.editClicked.emit(this.todoItem);
  }

}
